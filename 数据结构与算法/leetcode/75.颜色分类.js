/*
 * @lc app=leetcode.cn id=75 lang=javascript
 *
 * [75] 颜色分类
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    // 快速排序的partition
    // 区间定义
    // [0, p0) = 0
    // [p0, i) = 1
    // (p2, len - 1] = 2
    let p0 = 0;
    let i = 0;
    let p2 = nums.length - 1;
    while (i <= p2) {
        if (nums[i] === 0) {
            // 按照区间定义，p0前面的都是0
            [nums[i], nums[p0]] = [nums[p0], nums[i]];
            p0++;
            i++;
        } else if (nums[i] === 1) {
            i++;
        } else {
            // 按照区间定义，p2后面的都是2
            [nums[i], nums[p2]] = [nums[p2], nums[i]];
            p2--;
        }
    }
};
// @lc code=end

