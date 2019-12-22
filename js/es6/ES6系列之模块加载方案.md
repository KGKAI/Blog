# 前言

本篇我们重点介绍四种模块加载方案

1. AMD
2. CMD
3. CommonJS
4. ES6模块

最后再延伸讲一下Babel的编译和webpack打包的原理

# AMD与CMD的区别
- AMD：AMD是RequireJS在推广过程中对模块定义的规范化化产出。
- CMD：CMD是SeaJS在推广过程中对模块定义的规范化产出

#### 1.AMD推崇依赖前置，CMD推崇依赖就近。看两个项目中的main.js:
```
// requirejs中的main.js
require(['./add', './square'], function(addModule, squareModule) {
    addModule.add(1, 2)
    squareModule.square(3)
})
```
```
// seaJs中的main.js
define(function() {
    var addMoudle = require('./add')
    addModule.add(1, 2)

    var squareModule = require('./square')
    squareModule.square(3)
})
```
#### 2.对于依赖的模块，AMD是将需要使用的模块先加载完再执行，CMD是在require的时候才去加载模块文件，加载完接着执行。

# CommonJS
AMD和CMD都是用于浏览器端的模块规范，而在服务器端，例如NodeJS，采用的则是CommonJs规范。  

导出模块的方式：
```
var add = function(a, b) {
    return a + b;
}

module.exports.add = add;
```
引入模块的方式：
```
var add = require('./add')
add.add(1, 2)
```

类似于SeaJs的CMD规范，也是在require的时候才去加载文件，加载完接着执行。

# CommonJS与AMD
```
CommonJS加载模块是同步的，也就是说，只有加载完成，才能去执行后面的操作。
```
```
AMD规范则是异步加载模块，允许指定回调函数。
```

# ES6
跟requireJs的执行结果是一致的，也就是将需要的模块加载完再执行代码。类似于AMD规范

# ES6与CommonJS
它们有两个重大差异：
1. CommonJS输出的是一个值的拷贝，而ES6输出的是一个值的引用。
2. CommonJS是运行时加载，ES6模块是编译时输出接口。

第二个差异可以从两个项目的打印结果上看，导致这种差别的原因是：
```
因为CommonJS加载的是一个对象（module.exports属性），该对象只有在脚本运行完成才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
```
重点解释第一个差异：
```
CommonJs输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到已输出的值。
```
举个例子：
```
// 输出模块 counter.js
var counter = 3;
function incCounter() {
  counter++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
};
```
```
// 引入模块 main.js
var mod = require('./counter');

console.log(mod.counter);  // 3
mod.incCounter();
console.log(mod.counter); // 3
```
counter.js 模块加载以后，它的内部变化就影响不到输出的 mod.counter 了。这是因为 mod.counter 是一个原始类型的值，会被缓存。  
但是如果修改 counter 为一个引用类型的话：
```
// 输出模块 counter.js
var counter = {
    value: 3
};

function incCounter() {
    counter.value++;
}
module.exports = {
    counter: counter,
    incCounter: incCounter,
}
```
```
// 引入模块 main.js
var mod = require('./counter.js');

console.log(mod.counter.value); // 3
mod.incCounter();
console.log(mod.counter.value); // 4
```
value 是会发生改变的。不过也可以说这是 "值的拷贝"，只是对于引用类型而言，值指的其实是引用。  
而如果我们将这个例子改成 ES6:
```
// counter.js
export let counter = 3;
export function incCounter() {
  counter++;
}

// main.js
import { counter, incCounter } from './counter';
console.log(counter); // 3
incCounter();
console.log(counter); // 4
```
这是因为：
```
ES6的运行机制与CommonJS不一样。JS引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个引用，到被加载的模块里去取值。换句话说，原始值变了，import加载的值也会跟着改变。因此，ES6模块是动态引用，并且不会缓存值，模块里边的变量绑定其所在的模块。
```
# Babel
鉴于浏览器支持度的问题，如果要使用ES6，一般都会借助Babel，让我们看一下babels是怎么编译export和import语法的。
```
// ES6
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```
```
// Babel 编译后
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

exports.firstName = firstName;
exports.lastName = lastName;
exports.year = year;
```
是不是感觉有那么一点奇怪？编译后的语法更像是 CommonJS 规范，再看 import 的编译结果:
```
// ES6
import {firstName, lastName, year} from './profile';
```
```
// Babel 编译后
'use strict';

var _profile = require('./profile');
```
你会发现Babel只是把ES6语法转换为CommonJs模块语法，然而浏览器还是不支持这种语法，这时候还需要打包工具webpack将代码打包。
# webpack
这是因为浏览器环境中并没有 module、 exports、 require 等环境变量。

换句话说，webpack 打包后的文件之所以在浏览器中能运行，就是靠模拟了这些变量的行为。

```
// 自执行函数
(function(modules) {

    // 用于储存已经加载过的模块
    var installedModules = {};

    function require(moduleName) {

        if (installedModules[moduleName]) {
            return installedModules[moduleName].exports;
        }

        var module = installedModules[moduleName] = {
            exports: {}
        };

        modules[moduleName](module, module.exports, require);

        return module.exports;
    }

    // 加载主模块
    return require("main");

})({
    "main": function(module, exports, require) {

        var addModule = require("./add");
        console.log(addModule.add(1, 1))

        var squareModule = require("./square");
        console.log(squareModule.square(3));

    },
    "./add": function(module, exports, require) {
        console.log('加载了 add 模块');

        module.exports = {
            add: function(x, y) {
                return x + y;
            }
        };
    },
    "./square": function(module, exports, require) {
        console.log('加载了 square 模块');

        var multiply = require("./multiply");
        module.exports = {
            square: function(num) {
                return multiply.multiply(num, num);
            }
        };
    },

    "./multiply": function(module, exports, require) {
        console.log('加载了 multiply 模块');

        module.exports = {
            multiply: function(x, y) {
                return x * y;
            }
        };
    }
})

```

# 参考链接
https://juejin.im/post/5bea425751882508851b45d6