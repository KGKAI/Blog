/*
 * @lc app=leetcode.cn id=416 lang=javascript
 *
 * [416] 分割等和子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    // dp[i][j]定义：[0, i]区间内任选若干数（可以不选）的和是否等于j
    // 状态转移方程：取i与不取i
    // 不取i：dp[i][j] = dp[i - 1][j]
    // 取i：dp[i][j] = dp[i - 1][j - nums[i]]
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    if (sum % 2 === 1) return false;
    let target = Math.floor(sum / 2);

    const dp = new Array(nums.length).fill(false).map(item => new Array(target + 1).fill(false));
    for (let i = 0; i < nums.length; i++) {
        //  j = 0,表示不取一定是true
        dp[i][0] = true;
    }
    // 第一行只能取一个值，就是nums[0]
    dp[0][nums[0]] = true;

    for (let i = 1; i < nums.length; i++) { // 从第二行开始计算
        for (let j = 1; j <= target; j++) {
            if (j >= nums[i]) {
                // 选与不选nums[i]是或的关系
                // 不选：dp[i][j] = dp[i - 1][j]
                // 选：dp[i][j] = dp[i - 1][j - nums[i]]
                dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }
    return dp[nums.length - 1][target];
};
// @lc code=end

