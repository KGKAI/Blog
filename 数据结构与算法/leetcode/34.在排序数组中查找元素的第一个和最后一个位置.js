/*
 * @lc app=leetcode.cn id=34 lang=javascript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        // 如果找到了，需要看看边界
        if (nums[mid] === target) {
            // 往左
            let i = mid - 1;
            while (i >= 0 && nums[i] === nums[mid]) i--;
            // 往右
            let j = mid + 1;
            while (j < nums.length && nums[j] === nums[mid]) j++;
            return [i + 1, j - 1];
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return [-1, -1]
};
// @lc code=end

