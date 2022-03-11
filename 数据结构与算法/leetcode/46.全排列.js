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
    const res = [];
    const path = [];
  
    function dfs() {
      if (path.length === nums.length) {
        res.push([...path]);
        return;
      }
  
      for (let i = 0; i < nums.length; i++) {
        if (path.includes(nums[i])) continue;
  
        path.push(nums[i]);
        dfs();
        path.pop();
      }
    }
  
    dfs()
  
    return res;
  };
// @lc code=end

