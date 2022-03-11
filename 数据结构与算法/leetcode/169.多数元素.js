/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let candidate = -1;
    let count = 0;
    for (let num of nums) {
        if (num === candidate) {
            count++;
        } else {
            count--;
        }
        if (count < 0) {
            candidate = num;
            count = 1;
        }
    }

    return candidate;
};
// @lc code=end

