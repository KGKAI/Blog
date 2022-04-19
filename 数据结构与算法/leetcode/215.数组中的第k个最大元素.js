/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 
 * 基于快速排序的选择算法
 */
var findKthLargest = function (nums, k) {
    return quickSearch(nums, 0, nums.length - 1, nums.length - k)
    function quickSearch(nums, from, to, index) {
        if (from >= to) return nums[from];
        let i = from, j = to, key = nums[from];
        while (i < j) {
            while (i < j && nums[j] > key) j--;
            while (i < j && nums[i] <= key) i++;
            if (i < j) {
                [nums[i], nums[j]] = [nums[j], nums[i]]
            }
        }

        nums[from] = nums[j];
        nums[j] = key;

        if (j === index) {
            return nums[j];
        }

        return j > index ? quickSearch(nums, from, j - 1, index) : quickSearch(nums, j + 1, to, index)

    }
};
// @lc code=end

