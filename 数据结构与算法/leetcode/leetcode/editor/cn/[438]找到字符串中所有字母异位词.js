//给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
//
// 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
//
//
//
// 示例 1:
//
//
//输入: s = "cbaebabacd", p = "abc"
//输出: [0,6]
//解释:
//起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
//起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
//
//
// 示例 2:
//
//
//输入: s = "abab", p = "ab"
//输出: [0,1,2]
//解释:
//起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
//起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
//起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
//
//
//
//
// 提示:
//
//
// 1 <= s.length, p.length <= 3 * 10⁴
// s 和 p 仅包含小写字母
//
//
// Related Topics 哈希表 字符串 滑动窗口 👍 1388 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
  const need = {}, window = {}
  for (const c of p) {
    need[c] = (need[c] || 0) + 1
  }
  const count = Object.keys(need).length
  let l = 0, r = 0, match = 0
  const res = []
  while(r < s.length) {
    const c = s[r]
    r++
    window[c] = (window[c] || 0) + 1
    if (window[c] === need[c]) {
      match++
    }
    while(match === count) {
      if (r - l === p.length) {
        res.push(l)
      }
      const lc = s[l]
      l++
      if (window[lc] === need[lc]) {
        match--
      }
      window[lc]--
    }
  }

  return res
};
console.log(findAnagrams('abab', 'ab'))
//leetcode submit region end(Prohibit modification and deletion)
