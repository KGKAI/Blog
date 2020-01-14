# 一、React为什么需要Fiber
React通过Fiber架构，让自己的Reconcilation（协调）过程变得可中断，适时的让出CPU执行权，以让浏览器及时地相应用户的交互。

# 二、什么是Fiber
对于React来说，Fiber可以从以下两个角度理解：
### 1. 一种流程控制原语
Fiber也称协程。协程和线程并不一样，协程本身是没有并发或者并行能力的（需要配合线程），它只是一种控制流程让出的机制。
- 主动让出机制  
- requestIdleCallback API  
让浏览器在有空的时候就执行我们的回调，这个回调回会传入一个期限，表示浏览器有多少时间供我们执行，为了不耽误事，我们最好在这个时间内执行完毕。
  - 浏览器一帧（Frame）内可能会做的事情
    - 处理用户输入事件
    - Javascript执行
    - requestAnimationFrame调用
    - 布局Layout
    - 绘制 Paint       
  理想的一帧时间是16ms，如果浏览器处理完上述的任务后还有盈余，浏览器就会执行requestIdleCallback的回调。  

  ![requestidleCallback](https://user-gold-cdn.xitu.io/2019/10/21/16deecc43c710e16?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
***目前requestIdleCallback只有chrome浏览器支持，所以React自己实现了一个。***
### 2. 一个执行单元
Fiber的另一种解读是“纤维”：这是一种 ***数据结构或者说执行单元*** 。将它视作一个执行单元，每次执行完一个‘执行单元’，React就会检查现在还剩多少时间，如果没有时间就将控制权让出去。  

假设用户调用 *setState*更新组件，这个待更新的组件会先放入updateQueue更新队列中，然后通过requestIdleCallback请求浏览器调度：
```javascript
updateQueue.push(updateTask)
requestIdleCallback(performWork, {timeout})
```
现在浏览器有了空闲或者超时就会调用performWork来执行任务：
``` javascript
function performWork(deadline) {
    // 循环取出updateQueue中的任务
    while (updateQueue.length >0 && deadline.timeRemaining > ENOUGH_
    TIME) {
        workLoop(deadline);
    }

    // 如果在本次执行中，未能将所有任务执行完毕，那就再请求浏览器调度
    if (updateQueue.length > 0) {
        requestIdleCallback(performWork);
    }
}
```

workLoop 的工作大概猜到了，它会从更新队列(updateQueue)中弹出更新任务来执行，每执行完一个‘执行单元‘，就检查一下剩余时间是否充足，如果充足就进行执行下一个执行单元，反之则停止执行，保存现场，等下一次有执行权时恢复:
```javascript
// 保存当前的处理现场
let nextUnitOfWork: Fiber | undefined // 保存下一个需要处理的工作单元
let topWork: Fiber | undefined        // 保存第一个工作单元

function workLoop(deadline: IdleDeadline) {
  // updateQueue中获取下一个或者恢复上一次中断的执行单元
  if (nextUnitOfWork == null) {
    nextUnitOfWork = topWork = getNextUnitOfWork();
  }

  // 每执行完一个执行单元，检查一次剩余时间
  // 如果被中断，下一次执行还是从 nextUnitOfWork 开始处理
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    // 下文我们再看performUnitOfWork
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork, topWork);
  }

  // 提交工作，下文会介绍
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}
```
![流程图](https://user-gold-cdn.xitu.io/2019/10/21/16deed1711f281b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

# 三、React的Fiber改造
### 1.数据结构的调整
模拟函数调用栈，将之前需要递归处理的事情分解成增量的执行单元，将递归转换成迭代。

React目前的做法是链表，每个vitualDom节点内部现在使用Fiber表示，它的结构大概如下：
```javascript
    export type Fiber {
        // Fiber类型信息
        type: any,
        // 当前节点的父节点或者render该节点的组件
        return: Fiber | null,
        // 指向第一个子节点
        child: Fiber | null,
        // 指向下一个兄弟节点
        sibling: Fiber | null
    }
```
React Fiber 也被称为虚拟栈帧(Virtual Stack Frame), 你可以拿它和函数调用栈类比一下, 两者结构非常像:  

-|函数调用栈|Fiber
-|-|-|
基本单位|函数|VitualDom节点
输入|函数参数|props
本地状态|本地变量|state
输出|函数返回值|React Element
下级|嵌套函数调用|子节点（child）
上级引用|返回地址|父节点（return）

Fiber和调用栈帧一样，保存了节点处理的上下文信息，因为是手动实现的，所以更为可控，我们可以保存在内存中，随时中断和恢复。  
来看看performUnitOfWork的实现，它其实就是一个深度优先的遍历：
```javascript
function performUnitOfWork(fiber: Fiber, topWork: Fiber) {
    beginWork(fiber)
    // 如果存在子节点，那么下一个待处理的就是子节点
    if (fiber.child) {
        return fiber.child
    }
    // 如果没有子节点，就上溯查找兄弟节点
    let temp = fiber
    while (temp) {
        completeWork(temp)
        // 如果到顶层节点，退出
        if (temp == topWork) {
            break
        }
        //  如果有兄弟节点，那么下一个待处理的就是兄弟节点
        if (temp.sibling) {
            return temp.sibling
        }

        // 没有，继续上溯
        temp = temp.return
    }
}
```
***因为使用了链表结构***，即使处理流程被中断了，我们随时可以从上次未处理完的Fiber继续遍历下去
![流程图](https://user-gold-cdn.xitu.io/2019/10/21/16deecca7850a24d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
比如你在text(hello)中断了，那么下一次就会从p节点开始处理

这个数据结构调整还有一个好处，就是某些节点异常时，我们可以打印出完整的’节点栈‘，只需要沿着节点的return回溯即可

### 2.两个阶段的拆分
除了Fiber工作单元的拆分，两阶段的拆分也是一个非常重要的改造，在此之前都是一边diff一边提交，先来看看两者的区别：
- 协调阶段（Reconcilation）:可以认为是Diff阶段，**这个阶段可以被中断**。这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等，这些变更React称为**副作用**,以下生命周期钩子会在协调阶段被调用：
    - constructor
    - componentWillMount 废弃
    - componnetWillReceiveProps 废弃
    - static getDerivedStateFromProps 
    - shouldComponentUpdate
    - componentWillUpdate 废弃
    - render 在state或props更新时生成一棵新树
- 提交阶段（Commit）
将上一阶段计算出来的需要处理的副作用（Effect）一次性执行了。这个阶段***必须同步执行，不能被打断***。这些生命周期钩子在提交阶段被执行：
    - getSnapshotBeforeUpdate() 严格来说，这个是在进入commit阶段之前调用
    - componentDidMount
    - componentDidUpdate
    - componentWillUnmount

也就是说，在协调阶段如果时间片用完，React就会选择让出控制权。因为协调阶段执行的工作不会导致任何可见的变更，所以在这个阶段让出控制权不会有什么问题。  
需要注意的是：***React协调阶段的生命周期钩子可能会被调用多次，***例如componentWillMount可能会被调用两次。
### 3. Reconcilation
首先进一步看一下Fiber的结构：
```javascript
    interface Fiber {
  /**
   * ⚛️ 节点的类型信息
   */
  // 标记 Fiber 类型, 例如函数组件、类组件、宿主组件
  tag: WorkTag,
  // 节点元素类型, 是具体的类组件、函数组件、宿主组件(字符串)
  type: any,

  /**
   * ⚛️ 结构信息
   */ 
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  // 子节点的唯一键, 即我们渲染列表传入的key属性
  key: null | string,

  /**
   * ⚛️ 节点的状态
   */
  // 节点实例(状态)：
  //        对于宿主组件，这里保存宿主组件的实例, 例如DOM节点。
  //        对于类组件来说，这里保存类组件的实例
  //        对于函数组件说，这里为空，因为函数组件没有实例
  stateNode: any,
  // 新的、待处理的props
  pendingProps: any,
  // 上一次渲染的props
  memoizedProps: any, // The props used to create the output.
  // 上一次渲染的组件状态
  memoizedState: any,


  /**
   * ⚛️ 副作用
   */
  // 当前节点的副作用类型，例如节点更新、删除、移动
  effectTag: SideEffectTag,
  // 和节点关系一样，React 同样使用链表来将所有有副作用的Fiber连接起来
  nextEffect: Fiber | null,

  /**
   * ⚛️ 替身
   * 指向旧树中的节点
   */
  alternate: Fiber | null,
}

```
Fiber 包含的属性可以划分为 5 个部分:
- 🆕 结构信息 - 这个上文我们已经见过了，Fiber 使用链表的形式来表示节点在树中的定位
- 节点类型信息 - 这个也容易理解，tag表示节点的分类、type 保存具体的类型值，如div、MyComp
- 节点的状态 - 节点的组件实例、props、state等，它们将影响组件的输出
- 🆕 副作用 - 这个也是新东西. 在 Reconciliation 过程中发现的'副作用'(变更需求)就保存在节点的effectTag 中(想象为打上一个标记).那么怎么将本次渲染的所有节点副作用都收集起来呢？ 这里也使用了链表结构，在遍历过程中React会将所有有‘副作用’的节点都通过nextEffect连接起来
- 🆕 替身 - React 在 Reconciliation 过程中会构建一颗新的树(官方称为workInProgress tree，WIP树)，可以认为是一颗表示当前工作进度的树。还有一颗表示已渲染界面的旧树，React就是一边和旧树比对，一边构建WIP树的。 alternate 指向旧树的同等节点。
