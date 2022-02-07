/**
 * 给你一个整数数组 nums ，和一个表示限制的整数 limit，请你返回最长连续子数组的长度，该子数组中的任意两个元素之间的绝对差必须小于或者等于 limit 。

    如果不存在满足条件的子数组，则返回 0 。
    示例 1：

    输入：nums = [8,2,4,7], limit = 4
    输出：2 
    解释：所有子数组如下：
    [8] 最大绝对差 |8-8| = 0 <= 4.
    [8,2] 最大绝对差 |8-2| = 6 > 4. 
    [8,2,4] 最大绝对差 |8-2| = 6 > 4.
    [8,2,4,7] 最大绝对差 |8-2| = 6 > 4.
    [2] 最大绝对差 |2-2| = 0 <= 4.
    [2,4] 最大绝对差 |2-4| = 2 <= 4.
    [2,4,7] 最大绝对差 |2-7| = 5 > 4.
    [4] 最大绝对差 |4-4| = 0 <= 4.
    [4,7] 最大绝对差 |4-7| = 3 <= 4.
    [7] 最大绝对差 |7-7| = 0 <= 4. 
    因此，满足题意的最长子数组的长度为 2 。
    示例 2：

    输入：nums = [10,1,2,4,7,2], limit = 5
    输出：4 
    解释：满足题意的最长子数组是 [2,4,7,2]，其最大绝对差 |2-7| = 5 <= 5 。
    示例 3：

    输入：nums = [4,2,2,2,4,4,2,2], limit = 0
    输出：3
 */

 // 滑动窗口 + 单调队列
var longestSubarray = function(nums, limit) {
    let ans = 1, start = 0, end = 1, n = nums.length, min = [nums[0]], max = [nums[0]]
    while(end < n) {
        while(min.length > 0 && min[min.length - 1] > nums[end]) min.pop()  // 保证最小值队列是单调递增的，即min[0]是最小值
        while(max.length > 0 && max[max.length - 1] < nums[end]) max.pop()  // 保证最大值队列是单调递减的，即max[0]是最大值

        min.push(nums[end])
        max.push(nums[end])

        if (Math.abs(max[0] - min[0]) > limit) {    // 如果当前最大值-最小值大于limit，那么需要移动窗口左边界
            if (min[0] === nums[start]) min.shift()
            if (max[0] === nums[start]) max.shift()
            start++
        }

        ans = Math.max(ans, end - start + 1)
        end++
    }
    
    return ans
};

console.log(longestSubarray([10,1,2,4,7,2], 5))