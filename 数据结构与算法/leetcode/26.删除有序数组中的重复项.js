/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 快慢指针
 * 快慢指针都指向最左侧
 * 快指针先走，如果找到一个不同的元素，则向右移动慢指针，
 * 然后把nums[fast]赋值给nums[slow]
 * 然后继续遍历，直到快指针遍历完数组
 */
var removeDuplicates = function(nums) {
    let slow = 0, fast = 0;
    while (fast < nums.length) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
        fast++;
    }

    return slow + 1;
};
// @lc code=end

