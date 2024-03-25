function promisify(fn) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      const result = fn.apply(null, args)
      resolve(result)
    })
  }
}

function fn(a, b) {
  return a + b
}

let promise = promisify(fn)
promise(1, 4).then((res) => console.log(res))