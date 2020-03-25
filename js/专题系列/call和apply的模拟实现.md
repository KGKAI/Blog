## call的实现
#### 核心思想：
- 将函数添加到指定的对象上
- 执行函数
- 从对象上删除函数
- 传入对象为null时，this为window
- 动态调用参数
#### 不用ES6实现

```javascript
Function.prototype.mycall = function(context) {
	context = context || window;	// 如果没有传对象，指向window
	context.fn = this;

	var args = [];
	for (var i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']');	// args为[arguemnts[0], arguments[1],...,arguments[n]],这是为了eval计算做准备
	}
	var result = eval('context.fn(' + args + ')');
	delete context.fn;
	return result;
}

// 以下为测试
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.mycall(null); // 2

console.log(bar.mycall(obj, 'kevin', 18));
```
#### ES6实现

```javascript
Function.prototype.mycall = function(context) {
	context = context || window;
	context.fn = this;

	let args = [...arguments].slice(1);
	console.log(args);
	let result = context.fn(...args);
	delete context.fn;
	return result;
}
```
## apply的实现

```javascript
Function.prototype.myapply = function(context) {
	context = context || window;
	context.fn = this;

	let result;
	if (arguments[1]) {
		console.log(...arguments[1]);
		result = context.fn(...arguments[1]);
	} else {
		result = context.fn();
	}

	delete context.fn;

	return result;
}

var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

// bar.myapply(null);

console.log(bar.myapply(obj, ['kelwin', 18]));
```
