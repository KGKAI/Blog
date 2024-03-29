function closeLight(count) {
  const res = []
  for (let i = 1; i <= count; i++) {
    if (isPerfectSquare(i)) {
      res.push(i)
    }
  }

  return res
}

function isPerfectSquare(num) {
  if (num < 2) return true
  let l = 0
  let r = Math.floor(num / 2)
  while(l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (mid * mid === num) {
      return true
    } else if (mid * mid < num) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }

  return false
}

console.log(closeLight(100))
