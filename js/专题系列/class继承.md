## super关键字
super既可以当函数使用，也可以当对象使用。

- super作为函数调用时，代表父类的==构造函数==。子类的构造函数必须执行一次super函数。
- super作为对象时，在普通方法中，指向父类的原型对象（A.prototype,定义在父类实例上（this）的方法或属性无法通过super调用）；在静态方法中，指向父类。
- ES6规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向子类实例。实际上执行的是super.func.call(this)。如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。

## 类的prototype属性和__proto__属性
（1）子类的__proto__属性，表示构造函数的继承，总是指向父类  
（2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
  
类的继承是按照下面的模式实现的

```
class A{}

class B extends A {}

Object.setPrototypeOf(B.prototype, A.prototype)

Object.setPrototypeOf(B, A)

// 
Object.setPrototypeOf = function (obj, proto) {
   obj.__proto__ = proto;
   return obj;
}
```

