function curry(fn) {
    let length = fn.length;     // 参数的长度
    let args = [].slice.call(arguments, 1)  // 部分参数
    return function() {
        args = args.concat(...arguments);
        if (args.length < length) {
            return curry.call(this, fn, ...args)
        } else {
            return fn.apply(this, args)
        }
    }
}

function fn(a, b, c) {
    console.log(a + b + c)
    return a + b + c
}
var fn2 = curry(fn, 1)
fn2(2)(3)

var fn3 = curry(fn)
fn3(1)(2)(3)