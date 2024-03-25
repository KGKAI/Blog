function shuffle(arr) {
  let len = arr.length - 1
  while(len > 0) {
    const i = Math.floor(Math.random() * len--);
    [arr[i], arr[len]] = [arr[len], arr[i]]

  }
  return arr
}

console.log(shuffle([1,2,3,4,5,6,7,8,9]))