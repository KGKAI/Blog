/*
写一个类MyQueue，包含add方法，给后台发送请求（调用ajax即可），限制同一时刻最多3个请求。add需要返回promise，
如下 调用举例
let myQueue = new MyQueue; 
for (let i = 0; i < 100000; i++) { 
    myQueue.add('消息xxxx').then(() => { 
        console.log('消息xxxx发送成功')
    })
 }
*/

// 核心是处理并发数量，如果当前发送数量等于最大数量，那么先将目标封装一个函数放入队列，等到其他异步函数决议之后，
// 将count--，然后再从队列一个函数出来执行
class MyQueue {
    constructor(max) {
        this.max = max;
        this.count = 0
        this.taskQueue = []
    }

    add(caller, ...args) {
        return new Promise((resolve, reject) => {
            let task = this.createTask(caller, ...args, resolve, reject)
            if (this.count >= this.max) {
                this.taskQueue.push(task)
            } else {
                task()
            }
        })
    }

    createTask(caller, args, resolve, reject) {
        return () => {
            caller(args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.count--
                    if (this.taskQueue.length) {
                        let task = this.taskQueue.shift()
                        task()
                    }
                })
            this.count++
        }
    }
}

function ajax(i) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(i)
        }, 1000);
    })
}
let myQueue = new MyQueue(5); 
for (let i = 0; i < 100; i++) { 
    myQueue.add(ajax, i, 0).then((v) => { 
        console.log(v)
    })
 }