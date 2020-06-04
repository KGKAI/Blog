## 核心思想
- 返回的是一个函数，并不立即执行
- 可以在调用bind函数的时候传入部分参数，在调用bind返回的函数时传入剩下的参数
- bind返回的函数可以用作构造函数,new会改变this的指向

## 代码实现

```
Function.prototype.bind2 = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var fNOP = function () {};

    var fbound = function () {
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
    }

    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();

    return fbound;

}
```
