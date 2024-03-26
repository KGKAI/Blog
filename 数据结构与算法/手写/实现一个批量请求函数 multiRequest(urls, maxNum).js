function multiRequest(urls, maxNum) {
  let count = 0, queue = [], res = [], resolvedCount = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < urls.length; i++) {
      queue.push(() => {
        request(urls[i], i).then((data) => {
          console.log(data)
          res[i] = data
          count--
          resolvedCount++
          if (urls.length === resolvedCount) {
            resolve(res)
          }
          run()
        })
      })
    }

    run()
  })

  function run() {
    while(queue.length > 0 && count <= maxNum) {
      count++
      const cb = queue.shift()
      cb()
    }
  }
}

function request(url, index) {
  return new Promise((resolve, reject) => {
    let wait = 1000
    if (index === 2) {
      wait = 3000
    }
    setTimeout(() => {
      resolve(url + ' resolve')
    }, wait)
  })
}

console.time('a')
multiRequest(['a', 'b', 'c', 'd', 'e'], 3).then((res) => {
  console.log(res)
  console.timeEnd('a')
})
