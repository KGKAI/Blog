/*
 * @lc app=leetcode.cn id=90 lang=javascript
 *
 * [90] 子集 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    // 先排序
    nums.sort((a, b) => a - b);
    const res = [], path = [];
    recursive(0)
    function recursive(begin) {
        res.push([...path]);

        for (let i = begin; i < nums.length; i++) {
            if (i > begin && nums[i] === nums[i - 1]) continue

            path.push(nums[i])
            recursive(i + 1)
            path.pop()
        }
    }

    return res
};
// @lc code=end

