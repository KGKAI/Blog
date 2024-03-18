function debounce(fn, delay,immediate) {
  let timeout
  function debounced() {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, delay)
      if (callNow) {
        fn.apply(this, [...arguments])
      }
    } else {
      timeout = setTimeout(() => {
        fn.apply(this, [...arguments])
      }, delay)
    }
  }

  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }

  return debounced
}

function test() {
  console.log('test一秒后执行')
  return 'ok'
}
const debounced = debounce(test, 3000, false)
debounced()

setTimeout(() => {
  debounced.cancel()
}, 1000)

setTimeout(() => {
  console.log(222)
  debounced()
}, 2000)
