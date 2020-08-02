var PENDING = "pending"
var FULFILLED = "fulfilled"
var REJECTED = "rejected"
function MyPromise(resolver) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectionCallbacks = [];

    var that = this;
    function resolve(value) {
        if (that.status === PENDING) {      
            that.status = FULFILLED;
            that.value = value;

            // 执行注册的函数
            that.onFulfilledCallbacks.forEach(cb => {
                cb(that.value);
            });
        }
    }

    function reject(reason) {
        if (that.status === PENDING) {
            that.status = REJECTED;
            that.reason = reason;

            that.onRejectionCallbacks.forEach(cb => {
                cb(that.reason)
            })
        }
    }

    try{
        resolver(resolve, reject)
    } catch(err) {
        reject(err)
    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    var that = this;
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function(value) {return value}
    onRejected = typeof onRejected === "function" ? onRejected : function(reason) {throw reason}
    var promise2;
    if (that.status === FULFILLED) {
        promise2 = new MyPromise(function(resolve, reject) {
            setTimeout(function() {
                try{
                    if (typeof onFulfilled !== "function") {
                        resolve(that.value)
                    } else {
                        let x = onFulfilled(that.value);
                        resolvePromise(promise2, x, resolve, reject)
                    }
                } catch (e) {
                    reject(e)
                }
            }, 0)
        });
    } else if(that.status === REJECTED) {
        promise2 = new MyPromise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    if (typeof onRejected !== "function") {
                        reject(that.reason)
                    } else {
                        let x = onRejected(that.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                } catch (e) {
                    reject(e)
                }
            }, 0);
        })
    } else if (that.status === PENDING) {
        promise2 = new MyPromise(function(resolve, reject) {
            setTimeout(function() {
                that.onFulfilledCallbacks.push(function() {
                    try{
                        if (typeof onFulfilled !== "function") {
                            resolve(that.value);
                        } else {
                            let x = onRejected(that.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                    } catch(e) {
                        reject(e)
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
            }, 0);
        });
    }

    return promise2
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject('不能是同一个promise');
    }

    if (x && (typeof x === "function" || typeof x === "object")) {
        var then = x.then;
        var called = false;

        if (typeof then !== "function") {
            resolve(x);
        } else {
            try{
                then.call(x, function(y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, function(reason) {
                    if (!called) return;
                    called = true;
                    reject(reason);
                })
            } catch(err) {
                if (!called) return;
                called = true;
                reject(err);
            }
        }
    } else {
        resolve(x)
    }
}

MyPromise.prototype.race = function(array) {
    return new MyPromise(function (resolve, reject) {
        if (!Array.isArray) {
            return reject('must array')
        } else {
            var length = array.length;
            for (var i = 0; i < length; i++) {
                MyPromise.resolve(array[i]).then(resolve, reject)
            }
        }
    }); 
}

MyPromise.prototype.all = function(array) {
    return new MyPromise(function(resolve, reject) {
        if (!Array.isArray) {
            return reject("must error")
        } 

        var length = array.length;
        var count = 0;
        var result = [];
        
        for (var i = 0; i < length; i++) {
            MyPromise.resolve(array[i]).then(function(value) {
                result[i] = value;
                count++;
                if (count === length) {
                    resolve(result);
                }
            }, function(reason) {
                return reject(reason);
            })
        }
    });
}

MyPromise.prototype.allSettled = function(array) {
    return new MyPromise((resolve, reject) => {
        if (!Array.isArray(array)) return reject("error");

        let result = [];
        let length = array.length;
        let count = 0;

        array.forEach((promise, index) => {
            MyPromise.resolve(promise).then((value) => {
                result[index] = value;
                count++;
                if (count === length) {
                    resolve(result)
                }
            }, reason => {
                result[index] = reason
                count++
                if (count === length) {
                    resolve(result)
                }
            })
        });
    })
}

MyPromise.prototype.any = function(array) {
    return new MyPromise((resolve, reject) => {
        let result = [];
        let length = array.length;
        let count = 0;
        if (!Array.isArray(array)) return reject("error")

        array.forEach((promise, i) => {
            MyPromise.resolve(promise).then(resolve, reason => {
                result[i] = reason;
                count++;
                if (count === length) {
                    reject(result)
                }
            })
        });
    })
}

MyPromise.prototype.resolve = function(arg) {
    return arg instanceof MyPromise ? arg : new MyPromise(resolve => resolve(arg))
}