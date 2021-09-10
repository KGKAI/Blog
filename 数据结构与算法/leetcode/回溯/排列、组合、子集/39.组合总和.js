/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

/** 搜索回溯 
 * 此类问题是数组中的所有元素都可以被重复利用
 * 基本思路是找出所有符合条件的组合，难点在于如何去重
 * 去重的基本思路：在下次循环中剔除已经使用过的数组里的元素。即每次
 * 搜素的时候设置下一轮循环的起点begin。
*/
 var combinationSum = function(nums, target) {
    const len = nums.length;
    const res = [];
    const path = [];
    dfs(0, 0, path);
    function dfs(sum, begin, path) {
        if (sum === target) {
            res.push([...path]);
            return;
        }

        for (let i = begin; i < len; i++) {
            if (sum + nums[i] > target) continue;
            // 选择
            path.push(nums[i]);
            // 递归
            dfs(sum + nums[i], i, path);
            // 撤销选择
            path.pop();
        }
    }

    return res;
};
// @lc code=end

