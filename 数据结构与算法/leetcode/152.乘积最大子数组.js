/*
 * @lc app=leetcode.cn id=152 lang=javascript
 *
 * [152] 乘积最大子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    let res = -Infinity, max = 1, min = 1;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            [max, min] = [min, max];
        }

        max = Math.max(max * nums[i], nums[i]);
        min = Math.min(min * nums[i], nums[i]);
        res = Math.max(res, max);
    }

    return res;
};
// @lc code=end

