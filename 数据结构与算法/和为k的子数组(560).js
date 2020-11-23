/**
 * 
 * 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数
示例 1 :

输入:nums = [1,1,1], k = 2
输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
说明 :

数组的长度为 [1, 20,000]。
数组中元素的范围是 [-1000, 1000] ，且整数 k 的范围是 [-1e7, 1e7]。
 */

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

console.log(subarraySum([1, -1, 0], 0))
