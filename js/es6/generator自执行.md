## 多个异步任务（Promise）
```javascript
    var fetch = require('node-fetch');

    function* gen() {
        var r1 = yield fetch('https://api.github.com/users/github');
        var r2 = yield fetch('https://api.github.com/users/github/followers');
        var r3 = yield fetch('https://api.github.com/users/github/repos');

        console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
    }

    function run(gen) {
        var g = gen()

        function next(data) {
            var result = g.next(data)
            if (result.done) return

            result.value.then(function (data) {
                return data.json()
            }).then(function (data) {
                next(data)
            })
        }

        next()
    }

    run(gen)
```
## 回调函数
```javascript

    // 类thunk
    function fetchData(url) {
        return function(cb) {
            setTimeout(function() {
                cb({status: 200, data: url})
            }, 1000)
        }
    }

    function* gen() {
        var r1 = yield fetchData('https://api.github.com/users/github');
        var r2 = yield fetchData('https://api.github.com/users/github/followers');

        console.log([r1.data, r2.data].join('\n'));
    }

    function run(gen) {
        var g = gen()

        function next(data) {
            var result = g.next(data)
            if (result.done) return

            result.value(next)
        }
        next()
    }

    run(gen)
}
```

## return Promise
```javascript
function run(gen) {
    var gen = gen();

    return new Promise(function(resolve, reject) {
        function next(data) {
            try {
                var result = gen.next(data);
            } catch (e) {
                return reject(e);
            }

            if (result.done) {
                return resolve(result.value)
            };

            var value = toPromise(result.value);

            value.then(function(data) {
                next(data);
            }, function(e) {
                reject(e)
            });
        }

        next()
    })

}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;

```