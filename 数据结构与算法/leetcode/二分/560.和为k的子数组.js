/*
 * @lc app=leetcode.cn id=560 lang=javascript
 *
 * [560] 和为K的子数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// 前缀和技巧
// 将nums[i...j]
var subarraySum = function(nums, k) {
    let map = new Map()
    map.set(0, 1)
    let count = 0, sum = 0
    for (let i = 0 ; i < nums.length; i++) {
        sum += nums[i]
        let temp = sum - k
        if (map.has(temp)) {
            count += map.get(temp)
        }

        map.set(sum, (map.get(sum) ? map.get(sum) : 0) + 1)
    }

    return count
}
// @lc code=end

