# javascript事件循环
![事件循环执行图](https://user-gold-cdn.xitu.io/2017/11/21/15fdd88994142347?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
- 主线程自上而下执行所有代码
- 同步任务直接进入主线程被执行，而异步任务则进入到Event Table，并注册相对应的回调函数
- 异步任务（setTimeout等）完成后，Event Table 会把回调函数放到Event Queue中。
- 主线程任务执行完成后，会从Event Queue中读取任务，进入到主线程中执行

上述动作不断执行，就是事件循环
# 宏任务(MacroTask)、微任务(MicroTask)
二者任务都会被放置于任务队列中等待某个时机被主线程入栈执行，其实任务队列分为宏任务队列和微任务队列，其中放置的分别是宏任务和微任务。
- marcotask（宏任务）
    在浏览器端，其可以理解为该任务执行完后，在下一个macrotask执行开始前，浏览器可以进行页面渲染。触发macrotask任务的操作包括：
    - script（整体代码）
    - setTimeout、setInterval、setImmediate
    - I/O、UI交互事件
    - postMessage、MessageChannel
- microtask（微任务）可以理解为在macrotask任务执行后，页面渲染前立即执行的任务。触发microtask任务的操作包括：
    - Promise.then、catch、finally
    - MutationObserver
    - process.nextTick
# 浏览器下Event loop的实现
在主线程执行栈空闲的情况下，从任务队列中读取任务入执行栈，这个过程是不断循环的，所以又称Event loop。  
借用一张图![浏览器下event loop](https://img2018.cnblogs.com/blog/408483/201909/408483-20190912104534185-1914866236.png)
1.按先进先出原则选择最新进入event loop任务队列的一个macrotask，若没有则直接进入第6步的microtask
2.设置Event loop的当前任务为上面一步选择的任务
3.进栈运行所选的任务
4.运行完毕设置event loop的当前任务为null
5.将第一步选择的任务从任务队列删除
6.执行microtask
7.更新并进行ui渲染
8.返回第一步执行
# microtask跨浏览器实现
借助js原生支持的Promise、MutationObserver（浏览器）、process.nextTick来实现，均不支持时使用setTimeout（fn, 0）来兜底降级实现。
# 参考链接
https://www.cnblogs.com/wonyun/p/11510848.html