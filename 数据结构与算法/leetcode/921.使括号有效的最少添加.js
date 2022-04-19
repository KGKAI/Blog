/*
 * @lc app=leetcode.cn id=921 lang=javascript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 * 
 * 平衡法
 * 核心思路是以左括号为基准，遇到'('，对右括号的需求+1
 * 遇到')'，对右括号的需求-1
 * 如果')'先出现，则可能出现')'的需求小于0的情况，此时对'('的需求需要+1，来维持左右括号平衡
 */
var minAddToMakeValid = function (s) {
    let leftNeed = 0, rightNeed = 0;
    for (const char of s) {
        if (char === '(') {
            rightNeed++;
        } else if (char === ')') {
            rightNeed--;
            if (rightNeed === -1) {
                leftNeed++;
                rightNeed = 0;
            }
        }
    }

    return leftNeed + rightNeed;
};

console.log(minAddToMakeValid('()))'));
// @lc code=end

