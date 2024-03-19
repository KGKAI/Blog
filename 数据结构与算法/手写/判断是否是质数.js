function isPrime(num) {
  const sqrt = Math.floor(Math.sqrt(num))
  for (let i = 2; i <= sqrt; i++) {
    if (num % i === 0) {
      return false
    }
  }

  return true
}

console.log(isPrime(17))
