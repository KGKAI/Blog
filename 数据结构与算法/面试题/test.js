// ES5中的继承

const { strict } = require("assert")

// 1. 原型链继承 不能传参、子类实例共享父类的引用类型的属性
function Parent() {}
function Child() {}
Child.prototype = new Parent()

// 2. 借用构造函数 可以向父类传递参数，不能继承父类的原型方法
function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

// 3. 组合继承  可以达到目的，但parent构造方法执行两次,Child的原型上多了些父类的实例属性
function Parent(name) {
    this.name = name
}
function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}
Child.prototype = new Parent()

// 4. 原型式继承 未能解决共享实例属性的问题
function createObj(o) {
    function F() {}
    F.prototype = o
    return new F()
}

// 5. 寄生式继承
function createObj(o) {
    let clone = Object.create(o)
    clone.sayName = function() {
        console.log('my name is kevin')
    }
    return clone
}

// 6. 寄生组合式继承
function Parent(){}
function Child(){
    Parent.call(this)
}
function Nop() {}
Nop.prototype = Parent.prototype
let p = new Nop()
p.constructor = Child
Child.prototype = p

// instanceof 判断一个实例是否是其父类或祖先的实例
function _instanceof(L, R) {
    let lv = L.__proto__
    let rv = R.prototype
    while(true) {
        if (lv === null) {
            return false
        } 
        if (lv === rv) {
            return true
        }
        lv = lv.__proto__
    }
}

// 手写new
function objectFactory() {
    var obj = new Object()
    var Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    var ret = Constructor.apply(obj, arguments)
    return typeof ret === 'object' ? ret : obj
}

// 经典面试题
function Foo() {
    getName = function() {
      console.log(1);
    };
    return this;
  }
  Foo.getName = function() {
    console.log(2);
  };
  Foo.prototype.getName = function() {
    console.log(3);
  };
  var getName = function() {
    console.log(4);
  };
  function getName() {
    console.log(5);
  }
  
  //请写出以下输出结果:
  Foo.getName();    // Foo的静态方法 2
  getName();    // 变量提升，4
  Foo().getName();  // 先执行Foo,在函数内部修改了window.getName, Foo()返回了window， 1
  getName();    // 直接执行window上的方法 1
  new Foo.getName();    // 实际上是new A(), A = Foo.getName 2
  new Foo().getName();  // 先执行new Foo,返回Foo的实例，再执行f.getName(),是从原型上寻找 3
  new new Foo().getName();  // 先执行new Foo(),返回foo的实例，然后执行f.getName,实际上也是原型上的方法，返回 3

// class继承
// 只能通过new调用、子类继承了父类的静态属性、在constructor中必须先调用super才能使用this

// call apply bind
Function.prototype.myCall = function(context) {
    context = context || window
    context.fn = this
    let args = [].slice.call(arguments, 1)
    let result = context.fn(...args)
    delete context.fn
    return result
}

function foo(name, age) {
    this.name = name
    this.age = age
    console.log(this.x, this.name, this.age)   
    return 100
}
let obj = {
    x: 10
}
// foo.myCall(obj, '小明')
// foo.call(obj, '小明')

Function.prototype.myApply = function(context) {
    context = context || window
    context.fn = this
    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

// console.log(foo.myApply(obj))

Function.prototype.myBind = function(context) {
    context = context || window
    let fn = this
    let args = [].slice.call(arguments, 1)
    let fBound = function() {
        args = args.concat(...arguments)
        return fn.apply(this instanceof fn ? this : context, args)
    }

    function fNOP() {}
    fNOP.prototype = fn.prototype
    fBound.prototype = new fNOP()

    return fBound
}

// let f = foo.myBind(obj, '小王')
// console.log(f(18))
// console.log(new f(18))

// let f = foo.bind(obj, '小张')
// console.log(new f(20))

// 柯里化
function curry(fn) {
    let self = this, length = fn.length
    let args = [].slice.call(arguments, 1)  // 记录初始参数
    return function() {
        args = args.concat(...arguments)
        if (args.length < length) {
            return curry.call(self, fn, ...args)
        } else {
            return fn.apply(self, args)
        }
    }
}

function foo(a, b, c) {
    return a + b + c
}

let f = curry(foo, 1)
let f2 = f(2)
console.log(f2(3))

// 防抖
function debounce(fn, delay, immediate) {
    let timeout
    let debounced = function() {
        let self = this, args = arguments
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, delay);
            if (callNow) return fn.apply(self, args)
        } else {
            timeout = setTimeout(() => {
                fn.apply(self, args)
            }, delay);
        }
    } 

    debounced.cancel = function() {
        clearTimeout(timeout)
        timeout = null
    }

    return debounced
}

// 节流
function throttle(fn, delay) {
    let previous = 0, timeout
    let context, args
    return function() {
        context = this
        args = arguments
        let now = +new Date()
        let remaining = delay - (now - previous)
        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            fn.apply(context, args)
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = now
                timeout = null
                fn.apply(context, args)
            }, remianing);
        }
    }
}

// promise-retry
function getDataWithRetry(fn, times) {
    return new Promise((resolve, reject) => {
        function attempt() {
            Promise.resolve(fn()).then(
                v => resolve(v), 
                r => {
                    if (times > 0) {
                        times--
                        console.log(`还有${times}次尝试`)
                        attempt()            
                    } else {
                        reject(r)
                    }
                }
            )
        }

        attempt()
    })
}

function getData(){
    let p = new Promise(function(resolve, reject){
        setTimeout(function(){
            var num = Math.ceil(Math.random()*20); //生成1-10的随机数
            console.log('随机数生成的值：',num)
            if(num<=1){
                console.log('符合条件，值为'+num)
                resolve(num);
            }
            else{
                reject('数字大于10了执行失败');
            }
        }, 2000);
       })
       return p
  }

let p = getDataWithRetry(getData, 5)
p.then(v => console.log(v), r => console.log(r))

function getName() {
    
}

function deepCopy(obj, map = new WeakMap()) {
    if (!isObject(obj)) {
      return obj
    }
  
    if (map.has(obj)) {
      return map.get(obj)
    }
  
    let result = Array.isArray(obj) ? [] : new obj.constructor()
    map.set(obj, result)
    let symbols = Object.getOwnPropertySymbols(obj)
    if (symbols.length) {
      symbols.forEach(key => {
        result[key] = isObject(obj[key]) ? deepCopy(obj[key], map) : obj[key]
      })
    }
    Object.keys(obj).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = isObject(obj[key]) ? deepCopy(obj[key], map) : obj[key]
      }
    })
  
    return result
  }
  
  function isObject(val) {
    return val !== null && typeof val === "object"
  }
  
  function test() {
    this.a = 1
    this.b = { c: 2, d: [3, 4]}
    this.e = new Date()
  }
  
  test.prototype.f = 20
  let g = Symbol('g')
  let h = Symbol('h')
  let t = new test()
  t[g] = "gggggg"
  t[h] = "hhhhhh"
  console.log(deepCopy(t))

//   for (var i = 0; i < 10; i++) {
//       setTimeout(() => {
//           console.log(i)
//       }, 1000);
//   }
