/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
 var minWindow = function(s, t) {
    let left = 0, right = 0;
    // 用map很繁琐，用对象能够实现相同的效果
    // need保存t中各字符出现的次数，window表示窗口
    let need = {}, window = {};
    for (let char of t) {
      need[char] ? need[char]++ : need[char] = 1
    }
  
    let start = 0, len = Infinity, match = 0;
    let count = Object.keys(need).length;
    while (right < s.length) {
      // 窗口向右滑动
      let char = s[right];
      right++;
      window[char] ? window[char]++ : window[char] = 1
      // 如果字符数量能够匹配，则match + 1
      if (need[char] === window[char]) {
        match++;
      }
  
      while (match === count) {
        // 找到一个符合要求的字串，记录开始位置和长度
        if (right - left < len) {
          start = left;
          len = right - left;
        }
        // 缩小窗口
        let lc = s[left];
        left++;
        // 如果删除的是目标字符，则match相应减1
        if (window[lc] === need[lc]) {
          match--;
        }
        window[lc]--;
      }
    }
  
    return len === Infinity ? '' : s.substr(start, len);
  };
// @lc code=end

