/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    for (const char of s) {
        if (['(', '{', '['].includes(char)) {
            stack.push(char)
        } else if ([')', '}', ']'].includes(char)) {
            const left = stack.pop();
            if (!(left === '(' && char === ')' || left === '{' && char === '}' || left === '[' && char === ']')) {
                return false;
            }
        }
    }

    return stack.length === 0;
};
// @lc code=end

