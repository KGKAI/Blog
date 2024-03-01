//给你两个字符串 s1 和 s2 ，写一个函数来判断 s2 是否包含 s1 的排列。如果是，返回 true ；否则，返回 false 。
//
// 换句话说，s1 的排列之一是 s2 的 子串 。
//
//
//
// 示例 1：
//
//
//输入：s1 = "ab" s2 = "eidbaooo"
//输出：true
//解释：s2 包含 s1 的排列之一 ("ba").
//
//
// 示例 2：
//
//
//输入：s1= "ab" s2 = "eidboaoo"
//输出：false
//
//
//
//
// 提示：
//
//
// 1 <= s1.length, s2.length <= 10⁴
// s1 和 s2 仅包含小写字母
//
//
// Related Topics 哈希表 双指针 字符串 滑动窗口 👍 989 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  const need = {}, window = {}
  for (const c of s1) {
    need[c] = (need[c] || 0) + 1
  }
  const count = Object.keys(need).length
  let l = 0, r = 0, match = 0
  while(r < s2.length) {
    const c = s2[r]
    r++
    window[c] = (window[c] || 0) + 1
    if (window[c] === need[c]) {
      match++
    }
    while(match === count) {
      if (r - l === s1.length) {
        return true
      }
      const lc = s2[l]
      l++
      if (window[lc] === need[lc]) {
        match--
      }
      window[lc]--
    }
  }
  return false
};
//leetcode submit region end(Prohibit modification and deletion)
