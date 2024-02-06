//给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
//
//
//
// 示例 1：
//
//
//输入：s = "bcabc"
//输出："abc"
//
//
// 示例 2：
//
//
//输入：s = "cbacdcbc"
//输出："acdb"
//
//
//
// 提示：
//
//
// 1 <= s.length <= 10⁴
// s 由小写英文字母组成
//
//
//
//
// 注意：该题与 1081 https://leetcode-cn.com/problems/smallest-subsequence-of-
//distinct-characters 相同
//
// Related Topics 栈 贪心 字符串 单调栈 👍 1034 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function (s) {
  // 核心是单调递增栈
  const res = []
  for (let i = 0; i < s.length; i++) {
    const ch = s[i]
    if (!res.includes(ch)) {
      while (res.length > 0 && res[res.length - 1] > ch) {
        // 如果栈不为空并且栈顶元素大于当前元素，栈顶元素出栈直到栈顶元素小于当前元素
        const pop = res[res.length - 1]
        if (s.indexOf(pop, i) !== -1) { // 如果余下部分还有和当前元素相同的元素，则出栈，否则不出栈
          res.pop()
        } else {
          break
        }
      }
      res.push(ch)
    }
  }

  return res.join('')
};

console.log(removeDuplicateLetters('cbacdcbc'))
//leetcode submit region end(Prohibit modification and deletion)
