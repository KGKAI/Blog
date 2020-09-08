/**
 *  给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，
 * 使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。
示例 1:
输入: nums = [1,2,3,1], k = 3
输出: true
示例 2:
输入: nums = [1,0,1,1], k = 1
输出: true
示例 3:
输入: nums = [1,2,3,1,2,3], k = 2
输出: false
 */

// map
var containsNearbyDuplicate = function(nums, k) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {
            map.set(nums[i], i)
        } else {
            let index = map.get(nums[i])
            if(Math.abs(index - i) <= k) {
                return true
            } else {
                map.set(nums[i], i)
            }
        }
    }

    return false
};
// 保证set里的元素不超过k，这样在遇到下个元素的时候判断其是否在set中，如果是则符合条件
var containsNearbyDuplicate = function(nums, k) {
    let set = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true
        set.add(nums[i])
        if (set.size > k) set.delete(nums[i - k])
    }

    return false
};

console.log(containsNearbyDuplicate([1,2,3,1,3], 2))