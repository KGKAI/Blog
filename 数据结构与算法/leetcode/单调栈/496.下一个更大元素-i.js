/*
 * @lc app=leetcode.cn id=496 lang=javascript
 *
 * [496] 下一个更大元素 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
    const stack = [];
    const map = new Map();
    for (let i = nums2.length - 1; i >= 0; i--) {
        while (stack.length && stack[stack.length - 1] <= nums2[i]) {
            stack.pop();     
        }
        map.set(nums2[i], stack.length ? stack[stack.length - 1] : -1);
        stack.push(nums2[i]);
    }
    return nums1.map(i => map.get(i));
};
// @lc code=end

