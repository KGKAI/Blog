/*
 * @lc app=leetcode.cn id=287 lang=javascript
 *
 * [287] 寻找重复数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 基本思路是把数组转换成链表
// n => nums(n) 如何转换呢？拿[1,3,4,2,2]举例
// 0 -> 1
// 1 -> 3
// 3 -> 2
// 2 -> 4
// 4 -> 2
// 2 -> 4
// 4 -> 2
// ...
// 0 -> 1 -> 3 -> 2 -> 4 -> 2
var findDuplicate = function(nums) {
    let slow = 0, fast = 0;
    slow = nums[slow];
    fast = nums[nums[fast]];
    while (slow !== fast) {
        fast = nums[nums[fast]];
        slow = nums[slow];
    }

    slow = 0;
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return fast;
};
// @lc code=end

