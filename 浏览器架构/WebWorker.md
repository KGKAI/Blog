# 一、概述
  Web Worker的作用，就是为JavaScript创造多线程环境，允许主线程创建worker线程，将一些任务分配给后者运行。在主线程运行的同时，worker线程在后台运行，两者互不干扰。等到Worker线程完成计算任务，再把结果返回给主线程。这样的好处是，一些计算密集型或高延迟的任务，被worker线程负担了，主线程就会很流畅，不会被阻塞或拖慢。  

WebWorker线程一旦创建成功，就会始终运行，不会被主线程上的活动打断。这样有利于随时响应主线程的通信。但是，这样也造成了Worker比较耗费资源，不应该过度使用，而且一旦使用完毕，就应该关闭。    

web worker有以下几个注意点：
1. 同源限制  
分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
2. DOM限制  
Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以navigator对象和location对象。  
3. 通信联系  
Worker 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。  
4. 脚本限制  
Worker 线程不能执行alert()方法和confirm()方法，但可以使用 XMLHttpRequest 对象发出 AJAX 请求。
5. 文件限制  
Worker 线程无法读取本地文件，即不能打开本机的文件系统（file://），它所加载的脚本，必须来自网络。

# 二、基本用法
```javascript
    // 主线程
    var worker = new Worker('work.js');
    // 发送消息
    worker.postMessage('Hello World');
    worker.postMessage({method: 'echo', args: ['Work']};
    // 指定监听函数，接收子线程发回来的消息
    worker.onmessage = function (event) {
        console.log('Received message ' + event.data);
        doSomething();
    }

    function doSomething() {
        // 执行任务
        worker.postMessage('Work done!');
    }
    // 关闭
    worker.terminate();

    // worker线程
    self.addEventListener('message', function (e) {
        self.postMessage('You said: ' + e.data);
    }, false);

```
# 三、API
1. 主线程
> Worker.onerror：指定 error 事件的监听函数。  

> Worker.onmessage：指定 message 事件的监听函数，发送过来的数据在Event.data属性中。  

> Worker.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。  

> Worker.postMessage()：向 Worker 线程发送消息。  

> Worker.terminate()：立即终止 Worker 线程。
2. worker线程
> self.name： Worker 的名字。该属性只读，由构造函数指定。  

> self.onmessage：指定message事件的监听函数。  

> self.onmessageerror：指定 messageerror 事件的监听函数。发送的数据无法序列化成字符串时，会触发这个事件。  

> self.close()：关闭 Worker 线程。  

> self.postMessage()：向产生这个 Worker 线程发送消息。

> self.importScripts()：加载 JS 脚本。


# 参考链接
http://www.ruanyifeng.com/blog/2018/07/web-worker.html