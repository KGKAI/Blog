function promiseRetry(request, time) {
  return new Promise((resolve, reject) => {
    run(resolve, reject)
  })

  function run(resolve, reject) {
    request().then(resolve).catch((err) => {
      if (time-- > 0) {
        console.log(time, '次失败')
        run(resolve, reject)
      } else {
        reject(err)
      }
    })
  }
}

let index = 0
function request() {
  return new Promise((resolve, reject) => {
    // console.log(`第${index + 1}`)
    setTimeout(() => {
      if (index === 5) {
        resolve('成功返回')
      } else {
        reject('有错误了！')
        index++
      }
    }, 1000)
  })
}

promiseRetry(request, 5).then(console.log).catch(console.error)

