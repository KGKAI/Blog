/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = new Map();
    for (let str of strs) {
      const key = str.split('').sort().join('')
      if (map.has(key)) {
        const arr = map.get(key)
        arr.push(str);
      } else {
        map.set(key, [str])
      }
    }
  
    return [...map.values()]
};
// @lc code=end

