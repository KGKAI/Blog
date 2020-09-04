/**
给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。
 
示例 1:
输入: 12258
输出: 5
解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"

提示：0 <= num < 231
 */

// 法一： 字符串遍历
// 动态规划
// var translateNum = function(num) {
//     let str = num + ''
//     let a = 1, b = 1
//     for (let i = 2; i <= str.length; i++) {
//         let temp = str.substring(i - 2, i)
//         let c = (temp - '10' >= 0) && (temp - '25' <= 0) ? a + b : a
//         b = a
//         a = c
//     }

//     return a
// };
// 法二： 求余遍历
var translateNum = function(num) {
    let a = 1, b = 1, x = 0, y = 0
    while (num) {
        y = num % 10
        num = parseInt(num / 10)
        x = num % 10
        let temp = x * 10 + y
        let c = (temp >= 10 && temp <= 25) ? a + b : a
        b = a
        a = c
    }

    return a
};
console.log(translateNum(1250156147))