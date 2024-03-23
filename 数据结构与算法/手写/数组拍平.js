// 1、迭代
// function flat(arr) {
//   while(arr.some((item) =>  Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// 2、递归
// function flat(arr) {
//   const res = []
//   arr.forEach((item) => {
//     if (Array.isArray(item)) {
//       res.push(...flat(item))
//     } else {
//       res.push(item)
//     }
//   })
//
//   return res
// }

// 3、reduce实现
// function flat(arr) {
//   return arr.reduce((pre, item) => {
//     if (Array.isArray(item)) {
//       pre.push(...flat(item))
//     } else {
//       pre.push(item)
//     }
//     return pre
//   }, [])
// }

// 4、定义展开层数


const arr = [1, [2, 3], [4, [5, 6, [7, 8]]]]
console.log(flat(arr))