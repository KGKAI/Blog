/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长递增子序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 
 * dp[i]代表下标i处递增子序列的最大长度
 * 状态转换方程：
 */
var lengthOfLIS = function (nums) {
    const dp = new Array(nums.length).fill(1);
    let res = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        res = Math.max(res, dp[i]);
    }

    return res;
};
// @lc code=end

