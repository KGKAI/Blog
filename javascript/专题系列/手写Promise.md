# 源码
```js
// 构造函数
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";

function MyPromise(resolver) {
  this.status = PENDING;
  this.value = null;
  this.reason = null;

  this.onFulfilledCallbacks = [];
  this.onRejectionCallbacks = [];

  var that = this;
  function resolve(value) {
    // status不为pending，跳过
    if (that.status === PENDING) {
      that.status = FULFILLED;
      that.value = value;
      // 当resolve异步执行时，需要注册then的函数，等到决议后循环执行
      that.onFulfilledCallbacks.forEach(cb => cb(that.value));
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED;
      that.reason = reason;
      that.onRejectionCallbacks.forEach(cb => cb(that.reason));
    }    
  }

  // 立即执行resolver
  try {
    resolver(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejection) {
  // 规范要求，实际上没什么用，因为后边会对function进行判断
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : value => value;
  onRejection =
    typeof onRejection === "function"
      ? onRejection
      : reason => {
          throw reason;
        };
  var that = this;
  var promise2;
  if (that.status === FULFILLED) {
    promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          // 如果onFulfilled不是function,那么直接resolve promise1的value
          if (typeof onFulfilled !== "function") {
            resolve(that.value);
          } else {
            var x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  } else if (that.status === REJECTED) {
    promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onRejection !== "function") {
            reject(that.reason);
          } else {
            var x = onRejection(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
  } else if (that.status === PENDING) {
    promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        that.onFulfilledCallbacks.push(() => {
          try {
            // 如果onFulfilled不是function,那么直接resolve promise1的value
            if (typeof onFulfilled !== "function") {
              resolve(that.value);
            } else {
              var x = onFulfilled(that.value);
              // debugger
              // console.log(promise2, x)
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
  
        that.onRejectionCallbacks.push(() => {
          try {
            if (typeof onRejection !== "function") {
              reject(that.reason);
            } else {
              var x = onRejection(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      });
      }, 0);
  }
  return promise2;
};

function resolvePromise(promise, x, resolve, reject) {
  // 如果是同一个对象，则报错，为了防止死循环
  if (promise === x) {
    return reject(new Error("error"));
  }

  // 如果返回值x是一个对象，或者函数
  if (x && (typeof x === "function" || typeof x === "object")) {
    var then = x.then;
    var called = false;
    if (typeof then !== "function") {
      // then不存在或者不是函数
      resolve(x);
    } else {
      try {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } catch (error) {
          if(called) return;
          called = true;
          reject(error);
      }
    }
  } else {
    // 如果不是的话，则是普通对象，直接resolve
    resolve(x);
  }
}


MyPromise.resolve = function(arg) {
  return arg instanceof MyPromise ? arg : new MyPromise(resolve => resolve(arg));
}
MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => reject(reason))
}
MyPromise.race = function(array) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array)) {
      return reject("not array")
    } else {
      var length = array.length;
      for (let i = 0; i< length; i++) {
        MyPromise.resolve(array[i]).then(resolve, reject);
      }
    }
  })
}
MyPromise.all = function(array) {
  var resPromise = new MyPromise((resolve, reject) => {
    var count = 0;
    var result = [];
    var length = array.length;

    if (!Array.isArray(array)) {
      return reject("")
    }

    array.forEach((promise, index) => {
      MyPromise.resolve(promise).then((value) => {
        result[index] = value;
        count++;
        if (count === length) {
          resolve(result)
        }
      }, reason => reject(reason))
    })
  });
  return resPromise;
}

MyPromise.prototype.catch = function(reason) {
  return this.then(null, reason);
}

MyPromise.prototype.finally = function(callback) {
  if (typeof callback === "function") {
    return this.then((value) => MyPromise.resolve(callback()).then(() => value),
                      reason => MyPromise.resolve(callback()).then(() => {throw reason}))
  } else {
    return this.then(callback ,callback);
  }
}

MyPromise.allSettled = function(array) {
    let count = 0;
    let length = array.length;
    let result = [];
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(array)) {
            reject("not array")
        }

        array.forEach((p, i) => {
            MyPromise.resolve(p).then((value) => {
                result[i] = {status: 'fulfilled', value}
                count++;
                if (count === length) {
                    resolve(result);
                }
            },
            reason => {
                result[i] = {status: 'rejected', reason}
                count++;
                if (count === length) {
                    resolve(result);
                }
            })
        });
    })
}

MyPromise.any = function(array) {
    let count = 0;
    let length = array.length;
    let reasons = [];
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(array)) {
            return reject("not array")
        }
        array.forEach((p, i) => {
          MyPromise.resolve(p).then(resolve, reason => {
                reasons[i] = reason
                count++
                if (count === length) {
                    reject(reasons)
                }
          })        
        })
    })
}

MyPromise.prototype.retry = function(p, times) {
  return new Promise((resolve, reject) => {
    function attempt() {
      p.then(v => resolve(v)).catch(r => {
        if (times > 0) {
          times--
          attempt()
        } else {
          reject(r)
        }
      })
    }
    attempt()
  })
}
```

# promise的弊端
1.  延时执行
2.  promise一旦执行，无法撤销
3.  pending状态的时候，无法得知执行到哪一步
4.  promise会吞掉内部的错误，不会反映到外部

# 参考链接
https://www.jianshu.com/p/27735abb91eb
https://www.jianshu.com/p/c77cfde7ebe1
https://promisesaplus.com/#point-32