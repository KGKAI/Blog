/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const len = nums.length;
    const path = [];
    const vis = new Array(nums.length).fill(false)
    dfs();
    function dfs() {
        if (path.length === len) {
            res.push([...path]);
            return;
        }

        for (let i = 0; i < len; i++) {
            // i > 0确保i-1
            // nums[i] === nums[i-1]确保剔除重复元素，但此时会误杀，比如[1,1'], 1'会误杀
            // 所以!vis[i-1]代表上轮循环已经访问并且被撤销了。正是因为被撤销了，所以下轮搜索中还会用到，所以要将其排除
            if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
                continue;
            }

            path.push(nums[i])
            vis[i] = true
            dfs()
            vis[i] = false
            path.pop()
        }
    }

    return res;
};
// @lc code=end

