let timeoutId
function mySetInterval(fn, wait) {
  function internal() {
    timeoutId && clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn()
      internal()
    }, wait)
  }

  internal()
  return timeoutId
}

function myClearInterval(timeoutId) {
  clearTimeout(timeoutId)
}

let index = 0
function test() {
  console.log('test' + index++)
}

mySetInterval(test, 1000)

setTimeout(() => {
  myClearInterval(timeoutId)
}, 10000)
