/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function (nums) {
    nums.sort((a, b) => a - b);
    let res = [];
    for (let i = 0; i < nums.length; i++) {
      let left = i + 1, right = nums.length - 1;
      while(i < nums.length && nums[i] === nums[i + 1]) i++;
      while (left < right) {
        if (nums[i] + nums[left] + nums[right] === 0) {
          res.push([nums[i], nums[left], nums[right]]);
          while(left < right && nums[left + 1] === nums[left]) left++
          while(left < right && nums[right - 1] === nums[right]) right--
          left++
          right--
        } else if (nums[i] + nums[left] + nums[right] > 0) {
          right--
        } else {
          left++
        }
      }
    }
  
    return res;
  };
// @lc code=end

