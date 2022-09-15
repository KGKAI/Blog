/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
// var countAndSay = function (n) {
//     if (n === 1) return '1';
//     let str = '1';
//     while (--n > 0) {
//         const temp = [];
//         let startIndex = 0, last = str[0];
//         for (let i = 1; i < str.length; i++) {
//             if (str[i] !== last) {
//                 temp.push(i - startIndex, last)
//                 startIndex = i;
//                 last = str[i]
//             }
//         }
//         temp.push(str.length - startIndex, last)
//         str = temp.join('');
//     }
//     return str;
// };

/**
 * 双指针
 * @param {*} n 
 * @returns 
 */
var countAndSay = function (n) {
    let str = '1';
    for (let i = 2; i <= n; i++) {
        let pre = 0, cur = 0;
        let temp = ''
        while (cur < str.length) {
            while (cur < str.length && str[cur] === str[pre]) {
                cur++;
            }
            temp += (cur - pre) + str[pre]
            pre = cur;
        }
        str = temp;
    }
    return str;
};
// @lc code=end

