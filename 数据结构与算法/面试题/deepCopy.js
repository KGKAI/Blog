// 处理循环引用、Date、Error对象和symbol
// https://github.com/yygmind/blog/issues/29
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