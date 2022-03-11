/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 动归
// dp[i]表示和为i的完全平方数的最少数量
// dp[i]在遍历时初始值为i，表示最多有i个完全平方数的和为i(1+1+...+1)
// 状态转移方程dp[i] = min(dp[i], dp[i - j * j] + 1)
// bad case dp[0] = 0
var numSquares = function(n) {
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        dp[i] = i;
        for (let j = 1; i - j * j >= 0; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    return dp[n];
};
// @lc code=end

