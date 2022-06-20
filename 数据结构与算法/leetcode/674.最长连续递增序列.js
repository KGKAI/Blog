/*
 * @lc app=leetcode.cn id=674 lang=javascript
 *
 * [674] 最长连续递增序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    const dp = new Array(nums.length).fill(1);
    let ans = dp[0]
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            dp[i] = Math.max(dp[i], dp[i - 1] + 1)
        }
        ans = Math.max(ans, dp[i])
    }

    return ans;
};
// @lc code=end

