# 源码
```
// 构造函数
function promise(fn) {
    let that = this;
    that.status = "pending";
    that.value = "";
    that.reason = "";
    that.onFulfilledCbs = [];
    that.onRejectedCbs = [];

    function resolve(value) {
        if (value instanceof promise) {
            return value.then(resolve, reject);
        }

        setTimeout(function() {
            if (that.status === "pending") {
                that.status = "fulfilled";
                that.value = value; 
                that.onFulfilledCbs.map(item => {
                    item(value);
                })
            }
        }, 0)
    }

    function reject(reason) {
        setTimeout(function() {
            if (that.status === "pending") {
                that.status = "rejected";
                that.reason = reason;
                that.onRejectedCbs.forEach(item => {
                    item(reason)
                });
            }
        }, 0);
    }

    fn(resolve, reject);
}

// then 方法
promise.prototype.then = function(onFulfilled, onRejected) {
    let that = this;
    let promise2;
    
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v
    onRejected = typeof onRejected === "function" ? onRejected : v => v

    if (that.status === "pending") {
        return promise2 = new promise((resolve, reject) => {
            that.onFulfilledCbs.push(value => {
                try {
                    let x = onFulfilled(value);
                    promiseResolution(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });
            that.onRejectedCbs.push(value => {
                try {
                    let x = onRejected(vale);
                    promiseResolution(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);  
                }
            });
        })
    }

    if (that.status === "resolved") {
        return promise2 = new promise((resolve, reject) => {
            try {
                let x = onFulfilled(that.vale);
                promiseResolution(promise2, x, resolve, reject);
            } catch (e) {
                reject(e)
            }
        });
    }

    if (that.status === "rejected") {
        return promise2 = new promise((resolve, reject) => {
            try {
                let x = onRejected(that.value);
                promiseResolution(promise2, x, resolve, reject);
            } catch (e) {
                reject(e)
            }
        })
    }
}

// promise resolution
function promiseResolution (promise2, x, resolve, reject) {
    let then
    let thenCalled = false
    // 2.3.1
    if (promise2 === x) {
      return reject(new TypeError('promise2 === x is not allowed'))
    }
    // 2.3.2
    if (x instanceof promise) {
      x.then(resolve, reject)
    }
    // 2.3.3
    if (typeof x === 'object' || typeof x === 'function') {
      try {
        // 2.3.3.1
        then = x.then
        if (typeof then === 'function') {
          // 2.3.3.2
          then.call(x, function resolvePromise(y) {
            // 2.3.3.3.3
            if (thenCalled) return
            thenCalled = true
            // 2.3.3.3.1
            return promiseResolution(promise2, y, resolve, reject)
          }, function rejectPromise(r) {
            // 2.3.3.3.3
            if (thenCalled) return
            thenCalled = true
            // 2.3.3.3.2
            return reject(r)
          })
        } else {
          // 2.3.3.4
          resolve(x)
        }
      } catch(e) {
        // 2.3.3.3.4.1
        if (thenCalled) return
        thenCalled = true
        // 2.3.3.2
        reject(e)
      }
    } else {
      // 2.3.4
      resolve(x)
    }
  }



let p = new promise((resolve, reject) => {
	console.log(1111)
	resolve(222)
})
p.then(data => console.log(data))
p.then(data => console.log(data))

setTimeout(() => {
    p.then(data => console.log(data))
}, 2000)
```

# promise的弊端
1.  延时执行
2.  promise一旦执行，无法撤销
3.  pending状态的时候，无法得知执行到哪一步
4.  promise会吞掉内部的错误，不会反映到内部

# 参考链接
https://www.jianshu.com/p/27735abb91eb
https://www.jianshu.com/p/c77cfde7ebe1
https://promisesaplus.com/#point-32