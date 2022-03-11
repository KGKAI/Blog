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
 */
var findKthLargest = function (nums, k) {
    return quickSearch(nums, 0, nums.length - 1, nums.length - k);

    function quickSearch(nums, from, to, index) {
        if (from >= to) return nums[from];
        let i = from, j = to, key = nums[from];
        while (i < j) {
            while (i < j && nums[j] > key) j--;
            while (i < j && nums[i] <= key) i++;
            if (i < j) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        }
        nums[from] = nums[i];
        nums[i] = key;

        if (i === index) {
            return nums[i];
        }

        return i > index ? quickSearch(nums, from, i - 1, index) : quickSearch(nums, i + 1, to, index);
    }
};
// @lc code=end

