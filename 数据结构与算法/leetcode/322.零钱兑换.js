/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    // 以[1,2,5], 11 为例
    // dp[i]代表组成金额i所需的最少硬币数量
    // 状态转换方程dp[i] = Math.min(dp[i - coin] + 1, dp[i]), 比如11，min(dp[10] + 1, dp[9] + 1, dp[6] + 1)
    // 因为不知道最后一枚硬币的金额，所以需要枚举coins
    const dp = new Array(amount + 1).fill(amount + 1);  // 需要看到dp[11]，所以数组长度是11 + 1
    // bad case 
    dp[0] = 0
    for (let i = 1; i < dp.length; i++) {
        for (let coin of coins) {
            if (coin > i) continue;
            dp[i] = Math.min(dp[i], dp[i - coin] + 1)
        }
    }

    return dp[amount] === amount + 1 ? -1: dp[amount]
};
// @lc code=end

