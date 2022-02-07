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
    const res = []

    dfs('', n, n)
    function dfs(path, left, right) {   // left right 是剩余可用的括号数量
        if (left === 0 && right === 0) {
            res.push(path)
            return
        }

        if (left > right) {
            return
        }

        if (left > 0) {
            dfs(path + '(', left - 1, right)
        }

        if (right > 0) {
            dfs(path + ')', left, right - 1)
        }
    }

    return res
};
// @lc code=end

