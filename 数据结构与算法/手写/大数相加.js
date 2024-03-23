function add(a, b) {
  const maxLen = Math.max(a.length, b.length)
  a = a.padStart(maxLen, '0')
  b = b.padStart(maxLen, '0')

  let digit = 0
  let carry = 0
  let sum = ''
  for (let i = maxLen - 1; i >= 0; i--) {
    digit = parseInt(a[i]) + parseInt(b[i]) + carry
    carry = Math.floor(digit /  10)
    sum = String(digit % 10) + sum
  }

  if (carry === 1) {
    sum = '1' + sum
  }
  return sum
}

console.log(add('999', '999'))