// function numFormat(num) {
//   const [integer, decimals] = String(num).split('.')
//   const len = integer.length
//   const res = []
//   let count = Math.floor(len / 3)
//   const remain = len % 3
//   let start = remain
//   if (count > 0) {
//     while(count) {
//       res.push(integer.slice(start, start + 3))
//       start += 3
//       count--
//     }
//   }
//   if (remain) {
//     res.unshift(integer.slice(0, remain))
//   }
//   let numString = res.join(',')
//   if (decimals) {
//     numString = numString + '.' + decimals
//   }
//
//   return numString
// }

// 正则
function numFormat(num){
  return num.toString().replace(/\d+/, function(n){ // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g,function($1){
      console.log($1)
      return $1+",";
    });
  })
}

const num = 123456.789
console.log(numFormat(num))
