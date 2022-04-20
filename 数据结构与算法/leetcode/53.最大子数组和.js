/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子数组和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * dp[i]表示以nums[i]结尾的最大自数组和，所以dp数组的长度只需要等于nums的长度即可
 */
// var maxSubArray = function(nums) {
//     const dp = new Array(nums.length);
//     dp[0] = nums[0];
//     for (let i = 1; i < nums.length; i++) {
//         dp[i] = Math.max(nums[i], dp[i - 1] + nums[i])
//     }

//     let len = -Infinity;
//     for (let i = 0; i < dp.length; i++) {
//         len = Math.max(len, dp[i])
//     }

//     return len;
// };

var maxSubArray = function(nums) {
    const dp = new Array(nums.length);
    let ans = nums[0];
    dp[0] = nums[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
        ans = Math.max(ans, dp[i])
    }

    return ans;
};
// @lc code=end

