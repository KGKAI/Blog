// function flatten(arr) {
//     while(arr.some(item => Array.isArray(item))) {  // 如果还有是数组的项，结构
//         arr = [].concat(...arr);
//     }
//     return arr
// }

// let res = Array.from(new Set(flatten([1,2,3, [4, [5, 6]], 7, [8,9]]))).sort((a, b) => {
//     return a - b
// });

// console.log(res)

// 递归实现
function flatten(arr) {
    let res = []
    arr.map(item => {
        if (Array.isArray(item)) {
            res.push(...flatten(item))
        } else {
            res.push(item)
        }
    });

    return res;
}

let arr = [1,2,3, [4, [5, 6]], 7, [8,9]]
// console.log(flatten(arr))
console.log(arr.join(','))
console.log(arr.join(',').split(','))
// console.log(arr.join(',').split(',').map(item => Number(item)))