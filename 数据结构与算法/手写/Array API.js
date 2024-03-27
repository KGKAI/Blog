Array.prototype.myReduce = function(reducer, initialValue) {
  const arr = this
  if (!arr.length) return initialValue
  let index = 0
  if (initialValue === undefined || initialValue === null) {
    initialValue = arr[0]
    index++
  }
  while(index < arr.length) {
    initialValue = reducer(initialValue, arr[index], index, arr)
    index++
  }

  return initialValue
}


