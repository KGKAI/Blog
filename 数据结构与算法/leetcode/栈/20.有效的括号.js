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
var isValid = function (s) {
    if (s.length % 2) return false;
    let stack = [];
    for (let i = 0; i < s.length; i++) {
        if (['(', '{', '['].includes(s[i])) {
            stack.push(s[i])
        } else {
            let c = stack.pop();
            if (!(c === '(' && s[i] === ')' || c === '{' && s[i] === '}' || c === '[' && s[i] === ']')) {
                return false;
            }
        }
    }

    return !stack.length
};
// @lc code=end

