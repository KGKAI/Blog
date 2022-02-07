/*
 * @lc app=leetcode.cn id=921 lang=javascript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minAddToMakeValid = function (s) {
    // res记录需要插入左括号的数量，need记录需要插入的右括号的数量
    let res = 0, need = 0;
    // 核心思路是以左括号为基准，need记录对右括号的需求
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') { // 遇到左括号，对右括号的需求+1
            need++;
        } else if (s[i] === ')'){
            need--;
            if (need === -1) {  // 代表前面的都已匹配完成，类似'))'这种情况
                need = 0;   // 标记已完成
                res++;  // 左括号加1
            }
        }
    }

    return res + need;
};
// @lc code=end

