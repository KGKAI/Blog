function fn(a, b, c) {
  return a + b + c
}

const curry = (fn) => {
  const innerFn = (...args) => {
    if (args.length >= fn.length) {
      return fn.apply(null, args)
    } else {
      return (...args1) => innerFn(args.concat(args1))
    }
  }

  return innerFn
}

const add = curry(fn)
// add(1)(2)(3)
console.log(add(1)(2)(3))
