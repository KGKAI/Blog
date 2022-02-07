/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var checkInclusion = function(s1, s2) {
    let left = 0, right = 0;
    let need = {}, window = {};
    for (let char of s1) {
      need[char] ? need[char]++ : need[char] = 1;
    }
    const count = Object.keys(need).length;
    let match = 0;
    while (right < s2.length) {
      let char = s2[right];
      right++;
      // 进行窗口内数据的一系列更新
      window[char] ? window[char]++ : window[char] = 1;
      if (window[char] === need[char]) {
        match++;
      };
  
      // 判断窗口左侧是否要收缩
      while (right - left >= s1.length) {
        // 在这里判断找到了合适的子串
        if (match === count) {
          return true;
        }
        let lc = s2[left];
          left++;
        // 进行窗口的一系列更新
        if (window[lc] === need[lc]) {
          match--;
        }
        window[lc]--;
      }
  
    }
  
    return false;
  };
// @lc code=end

