/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 * 
 * 本题隐藏着一棵隐形的树，可以通过回溯法来求解
 * 使用深度优先遍历，做减法。left表示剩余可用的左括号，right表示剩余可用的右括号
 *  当left和right都大于0的时候，才可以产生分支 
 *  当产生左分支的时候，需要left > 0
 *  当产生右分支的时候，需要right > left 才可以使用; 反证：
 *  当left和right都为0的时候结算。
 */
var generateParenthesis = function (n) {
    const res = [];
    dfs('', n, n)
    return res;

    function dfs(path, left, right) {
        if (left === 0 && right === 0) {
            res.push(path);
            return;
        }

        if (left > 0) {
            // 因为path是拼接而成的，下一个path和当前的path无关，所以不需要严格回溯
            dfs(path + '(', left - 1, right);
        }

        if (right > left) {
            dfs(path + ')', left, right - 1);
        }
    }
};
// @lc code=end

