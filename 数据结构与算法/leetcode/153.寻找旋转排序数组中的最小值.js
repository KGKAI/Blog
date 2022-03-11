/*
 * @lc app=leetcode.cn id=153 lang=javascript
 *
 * [153] 寻找旋转排序数组中的最小值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    if (nums[nums.length - 1] >= nums[0]) return nums[0];
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const mid = l + Math.floor((r - l) / 2);

        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1]
        }
        if (nums[mid] < nums[mid - 1]) {
            return nums[mid]
        }

        if (nums[l] < nums[mid]) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return null;
};
// @lc code=end

