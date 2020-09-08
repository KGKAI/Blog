/**
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。

 

示例 1:

输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
示例 2:

输入: nums = [1], k = 1
输出: [1]
 */
// 暴力排序法： 先map出各个元素出现的次数，然后降序排序，取出前k个元素即可
// var topKFrequent = function(nums, k) {
//     let map = new Map()
//     for (let i = 0; i < nums.length; i++) {
//         let count = map.has(nums[i]) ? map.get(nums[i]) + 1 : 1
//         map.set(nums[i], count)
//     }

//     let arr = [...map].sort((a, b) => b[1] - a[1]).map(item => item[0])
//     return arr.slice(0, k)
// };

// 桶排序O(n)

var topKFrequent = function(nums, k) {
    let map = new Map(), ans = []
    for (let i = 0; i < nums.length; i++) {
        let count = map.has(nums[i]) ? map.get(nums[i]) + 1 : 1
        map.set(nums[i], count)
    }

    let list = []
    for (let key of map.keys()) {
        let count = map.get(key)
        if(!list[count]) list[count] = []
        list[count].push(key)
    }

    for (let i = list.length - 1; i >= 0 && ans.length < k; i--) {
        if (!list[i]) continue
        ans.push(...list[i])
    }

    return ans
};
console.log(topKFrequent([1], 1))