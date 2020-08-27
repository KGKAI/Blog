
# 取消一个请求：不是真正取消，请求还是会发送出去，响应的回调函数仍然会执行
```js
function fetchSetTimeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("执行成功");
    }, 5000);
  });
}
function fetch() {
    let cancel = {}
    var p = new Promise((resolve, reject) => {
      Object.defineProperty(cancel, 'signal', {
          set() {
              reject('Abort')
          }
      })
      fetchSetTimeout()
        .then(v => {
          resolve(v);
          console.log(v);
        })
        .catch(r => reject(r));
  });
  p.cancel = function() {
    cancel.signal = true
  };
  return p;
}

let p = fetch();
```

# Promise.race竞态，并不是真正的取消
```js
let timeoutPromise = timeout => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("我是 timeoutPromise，已经完成了" + timeout);
      console.log(timeout)
    }, timeout);
  });
};
let requestPromise = url => {
  return fetch(url);
};
Promise.race([timeoutPromise(1000), timeoutPromise(3000)])
  .then(resp => {
    console.log(resp);
  })
  .catch(error => {
    console.log(error);
  });
```

# 真正的终止请求和响应
```js
let controller = new AbortController()
let signal = controller.signal

fetch('https://www.baidu.com', {signal}).then(response => {

}).catch(reason => {})

controller.abort()
```
# link
https://www.jianshu.com/p/05d8e09ef08f
https://www.jianshu.com/p/79ab9f2e6c94