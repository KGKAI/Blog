Function.prototype.myCall = function(context) {
    context = context || window
    context.fn = this
    let args = [].slice.call(arguments, 1)
    let result = context.fn(...args)
    delete context.fn;
    return result;
}

function foo(name, age) {
    console.log(this.x, name, age)
    return 'foo'
}

let f = foo.bind({y: 1}, 'kevin')
f(18)
var x = 20
let o = new f(18)
console.log(o)

Function.prototype.myBind = function(context) {
    context = context || window
    let self = this
    let args = [].slice.call(arguments, 1)
    let fBound = function () {
        return self.apply(this instanceof self ? this : context, args.concat([...arguments]))
    }

    function fNOP() {}
    fNOP.prototype = self.prototype;
    fBound.prototype = new fNOP()

    return fBound
}