//给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
//
//
//
// 示例 1:
//
//
//输入: s = "abcabcbb"
//输出: 3
//解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
//
//
// 示例 2:
//
//
//输入: s = "bbbbb"
//输出: 1
//解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
//
//
// 示例 3:
//
//
//输入: s = "pwwkew"
//输出: 3
//解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
//     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
//
//
//
//
// 提示：
//
//
// 0 <= s.length <= 5 * 10⁴
// s 由英文字母、数字、符号和空格组成
//
// Related Topics 哈希表 字符串 滑动窗口 👍 8019 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let l = 0, r = 0, window = {}
  let max = 0
  while(r < s.length) {
    // 1. 将当前字符串添加到窗口里
    const char = s[r]
    window[char] ? window[char]++ : window[char] = 1
    while(window[char] > 1) { // 2. 如果存在重复的字符, 收缩窗口
      const leftChar = s[l]
      window[leftChar]--
      l++
    }
    max = Math.max(max, r - l + 1)
    r++
  }

  return max
};
console.log(lengthOfLongestSubstring('abcabcbb'))
//leetcode submit region end(Prohibit modification and deletion)
