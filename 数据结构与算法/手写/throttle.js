function throttle(fn, wait, options) {
  let timeout
  let previous = 0
  return function() {
    const now = +new Date()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    if (remaining <= 0) { // 如果没有剩余时间了，则执行fn
      fn.apply(this, arguments)
      previous = now
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    } else if (!timeout && !options.trailing === false) {
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
        clearTimeout(timeout)
        timeout = null
        previous = options.leading === false ? 0 : +new Date()
      }, remaining)
    }
  }
}

function test() {
  console.log('test')
}
const throttled = throttle(test, 2000, {trailing: true})
setInterval(() => {
  throttled()
}, 500)
