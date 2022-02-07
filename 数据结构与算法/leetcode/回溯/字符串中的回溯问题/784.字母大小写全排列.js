/*
 * @lc app=leetcode.cn id=784 lang=javascript
 *
 * [784] 字母大小写全排列
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
 var letterCasePermutation = function(s) {
    let res = [], path = '', begin = 0

    function dfs(s, path, begin) {
        if (path.length === s.length) {
            res.push(path)
            return
        }

        if (/[a-zA-Z]+/.test(s[begin])) {
            dfs(s, path + s[begin].toLowerCase(), begin + 1)
            dfs(s, path + s[begin].toUpperCase(), begin + 1)
        } else {
            dfs(s, path + s[begin], begin + 1)
        }
    }

    dfs(s, path, begin)

    return res
};
// @lc code=end

