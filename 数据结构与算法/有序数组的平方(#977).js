/**
 * 给定一个按非递减顺序排序的整数数组 A，返回每个数字的平方组成的新数组，要求也按非递减顺序排序。
示例 1：

输入：[-4,-1,0,3,10]
输出：[0,1,9,16,100]
示例 2：

输入：[-7,-3,2,3,11]
输出：[4,9,9,49,121]
 */


// var sortedSquares = function(A) {
//     let res = [], i = 0, j = A.length - 1
//     while(i <= j) {
//         let a = A[i] * A[i], b = A[j] * A[j]
//         if (a > b) {
//             res.unshift(a)
//             i++
//         } else {
//             res.unshift(b)
//             j--
//         }
//     }

//     return res
// };

// 双指针
var sortedSquares = function(A) {
    let res = [], i = 0, j = A.length - 1, k = A.length - 1
    while(i <= j) {
        let a = A[i] * A[i], b = A[j] * A[j]
        if (a > b) {
            res[k--] = a
            i++
        } else {
            res[k--] = b
            j--
        }
    }

    return res
};

console.log(sortedSquares([-4,-1,0,3,10]))