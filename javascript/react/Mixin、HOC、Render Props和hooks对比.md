# Mixin
mixin是一种通过扩展收集功能能的方式，它本质上是将一个对象的属性拷贝到另一个对象上面去，可以拷贝多个属性到一个对象上。
### 缺点
- mixin可能会相互依赖，不利于维护
- 不同的mixin中的方法可能会命名冲突
- React.class语法不再推荐
# HOC（装饰模式）
创建一个函数，该函数接受一个组件作为参数（也可以有其参数），返回一个新的组件
```js
function withSubscription(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                data: selectData(DataSource, props)
            }
        }

        render() {  // 使用新数据渲染被包装的组件
            return <WrappedComponent data={this.state.data} {...this.props}/>
        }
    }
}
```
### HOC优点
- 高阶组件就是一个没有副作用的纯函数，各个高阶组件不会互相依赖耦合
- 高阶组件并不关心数据使用的方式和原因，而被包裹的组件也不关心数据来自何处。高阶组件的增加不会为原组件增加负担
### HOC缺点
- HOC需要在原组件上进行包裹或者嵌套，如果大量使用HOC，会产生非常多的嵌套，这让调试变得困难
- HOC可以劫持props，存在相同名称的props，则会存在覆盖问题
- 当存在多个HOC时，无法得知props是从哪里来的
- HOC属于静态构建，即重新生成一个组件，返回的新组建，不会立即渲染，即新组建中定义的生命周期只有新组件被渲染时才会执行
- this的指向问题
# render props
通过一个名为render（属性名也可以不是render，只要值是一个函数即可）的属性，该属性是一个函数，这个函数接受一个对象并返回一个子组件，会将这个函数中的对象作为props传给新生成的组件。
### 优势
- 不用担心props是从哪里来的，它只能从父组件传递过来
- 不用担心props的命名问题
- render props是动态构建的
### 缺点
- 无法在return语句外访问数据
- 也会存在嵌套过多的问题
# hooks
### 优点
- 解决嵌套地狱的问题，无须修改组件结构
- 以更加优雅的方式管理状态逻辑和副作用
- 可以在不使用class的情况下使用更多react特性
### 缺点
- 只在最顶层使用hook(不能在if for中使用))
- 只在react函数中使用hook

# 参考
https://juejin.im/post/6844904085083127821
https://juejin.im/post/6844903910470057997