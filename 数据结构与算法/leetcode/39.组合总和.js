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
 var combinationSum = function(candidates, target) {
    const res = [];
    const path = [];
    let sum = 0;
  
    function dfs(start) {
      if (sum > target) return;
  
      if (sum === target) {
        res.push([...path]);
        return;
      }
  
      for (let i = start; i < candidates.length; i++) {
        path.push(candidates[i]);
        sum += candidates[i];
        dfs(i);
        path.pop();
        sum -= candidates[i];
      }
    }
  
    dfs(0);
    return res;
  };
// @lc code=end

