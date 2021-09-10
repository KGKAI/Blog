/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
    const len = nums.length;
    const path = [];
    let depth = 0;
    const res = [];
    recursive(depth, res)
    function recursive(depth, res) {
        if (depth === len) {
            res.push([...path]);
            return;
        }

        for (let i = 0; i < len; i++) {
            if (!path.includes(nums[i])) {
                path.push(nums[i]);
                recursive(depth + 1, res);
                path.pop();
            }
        }
    }
    return res;
};
// @lc code=end

