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
 * 
 * 整体思路是先遍历nums2找出nums2中所有元素的NextGreaterNumber，存放到map里，key为nums2[i],value为NGN。
 * 因为nums1是nums2的子集，且没有重复元素，所以可以根据map找出nums1中所有元素对应的NGN
 * 
 * 找NGN的思路是单调栈 for + while + stack
 * 1. 从后往前遍历nums2,栈顶元素小于等于当前元素的，出栈，直到在栈里找到一个比当前元素大的G
 * 2. 用map记录当前元素的G
 * 3. 当前元素入栈，接受下一轮审判
 */
var nextGreaterElement = function(nums1, nums2) {
    let map = new Map(); // map用来存放nums2的每个元素的nextGreaterNumber，key为nums2[i],value为nextGreaterNumber
    let stack = [];
    for (let i = nums2.length - 1; i >= 0; i--) {
        while (stack.length && nums2[i] >= stack[stack.length - 1]) {
            stack.pop();
        }

        map.set(nums2[i], stack.length ? stack[stack.length - 1] : -1);
        stack.push(nums2[i]);
    }

    return nums1.map(number => map.get(number));
};
// @lc code=end

