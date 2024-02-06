//给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、')' 和 '*'。请你检验这个字符串是否为有效字符串，如果是有效字符串返回 true 。
//
// 有效字符串符合如下规则：
//
//
// 任何左括号 '(' 必须有相应的右括号 ')'。
// 任何右括号 ')' 必须有相应的左括号 '(' 。
// 左括号 '(' 必须在对应的右括号之前 ')'。
// '*' 可以被视为单个右括号 ')' ，或单个左括号 '(' ，或一个空字符串。
// 一个空字符串也被视为有效字符串。
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
//输入：s = "(*)"
//输出：true
//
//
// 示例 3：
//
//
//输入：s = "(*))"
//输出：true
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 100
// s[i] 为 '('、')' 或 '*'
//
//
// Related Topics 栈 贪心 字符串 动态规划 👍 618 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {boolean}
 */
// var checkValidString = function(s) {
//   // 1. 用两个栈分别存储左括号和星号的下标
//   const leftStack = []
//   const asteriskStack = []
//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(') { // 2. 遇到左括号，下标进左括号栈
//       leftStack.push(i)
//     } else if (s[i] === '*') { // 3. 遇到星号，下标进星号栈
//       asteriskStack.push(i)
//     } else { // 4. 遇到右括号，需要进行匹配。因为星号可以是左括号、右括号和空字符串，所以优先匹配左括号栈，其次是星号栈。如果左括号栈和星号栈都为空，说明无法匹配，返回false
//       if (leftStack.length > 0) {
//         leftStack.pop()
//       } else if (asteriskStack.length > 0) {
//         asteriskStack.pop()
//       } else {
//         return false
//       }
//     }
//   }
//
//   // 5. 右括号匹配完成后，左括号栈和星号栈可能不为空，此时要将星号栈里的*作为)进行匹配，左括号栈和星号栈同时出栈
//   while (leftStack.length > 0 && asteriskStack.length > 0) {
//     const leftIndex = leftStack.pop()
//     const asteriskIndex = asteriskStack.pop()
//     if (leftIndex > asteriskIndex) return false
//   }
//
//   return leftStack.length === 0
// };

var checkValidString = function(s) {
  let minCount = 0
  let maxCount = 0
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      minCount++
      maxCount++
    } else if (s[i] === '*') {
      minCount = Math.max(minCount - 1, 0)
      maxCount++
    } else {
      minCount = Math.max(minCount - 1, 0)
      maxCount--
      if (maxCount < 0) {
        return false
      }
    }
  }

  return minCount === 0
};
//leetcode submit region end(Prohibit modification and deletion)
