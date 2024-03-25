// rgb(255,255,255)
function rgbToHex(str) {
  return str.replace(/^rgb\((\d{0,3})\s*,\s*(\d{0,3})\s*,\s(\d{0,3})\s*\)$/,function(match, $1, $2, $3) {
    return `#${Number($1).toString(16)}${Number($2).toString(16)}${Number($3).toString(16)}`
  })
}

console.log(rgbToHex('rgb(124, 25, 33)'))

function hexToRgb(str) {
  str = str.slice(1)
  if (str.length === 3) {
    str = str.split('').map((item) => item.repeat(2))
  }
  console.log(str)
  return str.replace(/(\w{2})(\w{2})(\w{2})/, function(_, $1, $2, $3) {
    return `rgb(${parseInt($1, 16)}, ${parseInt($2, 16)}, ${parseInt($3, 16)})`
  })
}

console.log(hexToRgb('#abc123'))