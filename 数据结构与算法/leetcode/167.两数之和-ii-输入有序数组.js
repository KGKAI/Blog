/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        if (nums[l] + nums[r] === target) {
            return [l + 1, r + 1]
        } else if (nums[l] + nums[r] > target) {
            r--
        } else if (nums[l] + nums[r] < target) {
            l++
        }
    }

    return []
};
// @lc code=end

