/*
 * @lc app=leetcode.cn id=581 lang=javascript
 *
 * [581] 最短无序连续子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 头尾指针
 * 
 * 根据题意，nums数组可以被分为3段，numsA、numsB、numsC
 * 其中numsA和numsC是有序的，只有numsB是无序的。
 * 因此此题转化为求numsB的左右边界。
 * 从两端开始遍历：[2, 6, 4, 8, 10, 9, 15]
 * - 从左往右遍历，维护一个max最大值，在进入右段（numsC）之前，所有的nums[i]都是小于max的，
 *   我们需要找到最后一个小于max的位置,即为右边界
 * - 从右往左遍历，维护一个min最小值，在进入左段（numsA）之前，所有的nums[i]都是大于min的，
 *   我们需要找到最后一个大于min的位置,即为左边界
 * 需要特别注意nums原本就是有序的情况，这种情况下left和right的值都不会改变，所以需要特殊处理
 */
 var findUnsortedSubarray = function(nums) {
    const n = nums.length;
    let min = Infinity;
    let max = -Infinity;
    let left = -1, right = -1;
    for (let i = 0; i < n; i++) {
        if (nums[i] < max) {
            right = i;
        } else {
            max = nums[i]
        }

        if (nums[n - i - 1] > min) {
            left = n - i - 1;
        } else {
            min = nums[n - i - 1];
        }
    }

    return right === -1 ? 0 : right - left + 1;
};
// @lc code=end

