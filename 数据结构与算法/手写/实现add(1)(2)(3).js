<<<<<<< Updated upstream
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
=======
// https://www.cnblogs.com/yalong/p/14298085.html

// 1、函数参数固定
// function fn(x, y, z) {
//   return x + y + z
// }
//
// function curry(fn, ...args) {
//   return function(...args1) {
//     const allArgs = args.concat(args1)
//     if (allArgs.length >= fn.length) {
//       return fn.apply(null, allArgs)
//     } else {
//       return curry.call(null, fn, ...allArgs)
//     }
//   }
// }
//
// const add = curry(fn, 1)
// console.log(add(2)(3))
// const add1 = curry(fn)
// console.log(add1(1)(2)(3))

// 2. 不固定参数
function add(...args) {
  let sum = args.reduce((pre, num) => pre + num, 0)
  function curried(...args1) {
    sum += args1.reduce((pre, num) => pre + num, 0)
    return curried
  }

  curried.toString = function() {
    return sum
  }

  return curried
}

console.log(add(1)(2)(3,4) + '')
>>>>>>> Stashed changes
