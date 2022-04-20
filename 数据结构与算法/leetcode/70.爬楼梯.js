/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 * dp[i]表示爬i阶楼梯有多少种爬法
 */
var climbStairs = function (n) {
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n]
};

// var climbStairs = function (n) {
//     let dp0 = 1, dp1 = 1, dp2 = 0;
//     if (n === 0 || n === 1) return 1;
//     for (let i = 2; i <= n; i++) {
//         dp2 = dp0 + dp1;
//         dp0 = dp1;
//         dp1 = dp2;
//     }

//     return dp2;
// };
// @lc code=end

