/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    
    function dfs(path, left, right) {
        if (left === 0 && right === 0) {
            res.push(path);
            return;
        }

        if (left > 0) {
            dfs(path + '(', left - 1, right)
        }

        if (right > left) {
            dfs(path + ')', left, right - 1)
        }
    }

    dfs('', n, n);
    return res;
};
// @lc code=end

