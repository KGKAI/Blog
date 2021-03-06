/**
 * 
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
示例:

输入: [1,2,3,0,2]
输出: 3 
解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 */

 // 动态规划
 // 第i天结束后可能有三种状态
 // 1. 持有股票 f[i][0], 可能是i-1天持有的，今日无操作，也可能是今天买入的: max(f[i-1][0], f[i-1][2]-prices[i])
 // 2. 不持有且在冷冻期,说明是今天卖出了股票: f[i-1][0] + prices[i]
 // 3. 不持有且不在冷冻期,则昨天结束后可能是冷冻期，今天不能操作，或者昨天max(f[i-1][1], f[i-1][2])
var maxProfit = function(prices) {
    let n = prices.length
    let dp = []
    for (let i = 0; i < n; i++) {
        dp[i] = new Array(3)
    }
    dp[0][0] = -prices[0]
    dp[0][1] = 0
    dp[0][2] = 0
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i-1][0], dp[i-1][2] - prices[i])
        dp[i][1] = dp[i-1][0] + prices[i]
        dp[i][2] = Math.max(dp[i-1][1], dp[i-1][2])
    }

    return Math.max(dp[n-1][1], dp[n-1][2])
};