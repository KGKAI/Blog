/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为 K 的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    /**
     * 思路： 前缀和 + hash优化
     * 前缀和：nums中以i为结尾的所有元素的和
     * 遍历nums数组，求每一项的前缀和，统计出现的次数，以键值对存放入map
     * 边遍历边查看map，如果map中存在[当前前缀和 - k],说明这个之前出现的前缀和，满足
     * [当前前缀和 - 之前前缀和 = k],把该前缀和对应的出现次数累加给count
     * 注意初始化map的时候，前缀和为0的时候初始化为1。举例:[3, ...], 3 和[1, 1, 1, ...], 3
     */
    let res = 0;
    // 前缀和
    const prefix = new Map();
    // 前缀和为0的数量为1 bad case
    prefix.set(0, 1);
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (prefix.get(sum - k)) {
            res += prefix.get(sum - k);
        }

        prefix.set(sum, (prefix.get(sum) || 0) + 1);
    }

    return res;
};
// @lc code=end