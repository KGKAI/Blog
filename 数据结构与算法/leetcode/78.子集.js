/*
 * @lc app=leetcode.cn id=78 lang=javascript
 *
 * [78] 子集
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];
    const path = [];
    function dfs(begin) {
        if (path.length > nums.length) {
            return;
        }

        res.push([...path]);
        for (let i = begin; i < nums.length; i++) {
            path.push(nums[i]);
            dfs(i + 1);
            path.pop();
        }

    }
    dfs(0);
    return res;
};
// @lc code=end

