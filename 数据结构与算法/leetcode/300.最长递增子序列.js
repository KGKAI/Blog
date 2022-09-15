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
 * dp[i]代表以nums[i]结尾的最长递增子序列的长度,转换方程是dp[i] = max(dp[i], dp[j] + 1)
 * dp[j]代表0...j结尾的最长递增子序列的长度
 * 因为是严格递增的，所以必须要在nums[i]>nums[j]时才更新dp[i],
 * 最后在遍历的过程中记录出现的最大长度
 */
var lengthOfLIS = function (nums) {
    const dp = new Array(nums.length).fill(1);
    let res = 1
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
        res = Math.max(res, dp[i]);
    }

    return res;
};

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]))
// @lc code=end

