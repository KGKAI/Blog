function restore(arr) {
  const origin = []
  while(arr.length > 0) {
    if (origin.length > 0) {
      const top = origin.pop()
      origin.unshift(top)
    }
    origin.unshift(arr.shift())
  }
  return origin
}

const result = [1,2,3,4,5,6,7,8,9,10,11,12,13]
console.log(restore(result))