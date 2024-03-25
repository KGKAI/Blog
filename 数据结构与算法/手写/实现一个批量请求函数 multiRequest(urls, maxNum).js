// 实现一个批量请求函数 multiRequest(urls, maxNum)，要求如下：
// • 要求最大并发数 maxNum
// • 每当有一个请求返回，就留下一个空位，可以增加新的请求
// • 所有请求完成后，结果按照 urls 里面的顺序依次打出

function fakeRequest(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url + '返回了')
    }, Math.floor(10 * Math.random()))
  })
}
function multiRequest(urls, maxNum) {
  const queue = []
  let count  = 0
  const res = []
  for (let i = 0; i < urls.length; i++) {
    queue.push(() => fakeRequest(urls[i]))
  }
}