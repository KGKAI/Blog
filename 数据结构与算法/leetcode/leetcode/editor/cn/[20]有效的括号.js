//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
//
// 有效字符串需满足：
//
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。
//
//
//
//
// 示例 1：
//
//
//输入：s = "()"
//输出：true
//
//
// 示例 2：
//
//
//输入：s = "()[]{}"
//输出：true
//
//
// 示例 3：
//
//
//输入：s = "(]"
//输出：false
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 10⁴
// s 仅由括号 '()[]{}' 组成
//
//
// Related Topics 栈 字符串 👍 4355 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if (!s) return false
  const stack = []
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (['(', '[', '{'].includes(c)) {
      stack.push(c)
    } else if ([')', ']', '}'].includes(c)) {
      const lc = stack.pop()
      if (!(lc === '(' && c === ')' || lc === '[' && c === ']' || lc === '{' && c === '}')) {
        return false
      }
    }
  }

  return stack.length === 0
};
//leetcode submit region end(Prohibit modification and deletion)
