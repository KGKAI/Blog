//给你一个以字符串表示的非负整数 num 和一个整数 k ，移除这个数中的 k 位数字，使得剩下的数字最小。请你以字符串形式返回这个最小的数字。
//
// 示例 1 ：
//
//
//输入：num = "1432219", k = 3
//输出："1219"
//解释：移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219 。
//
//
// 示例 2 ：
//
//
//输入：num = "10200", k = 1
//输出："200"
//解释：移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
//
//
// 示例 3 ：
//
//
//输入：num = "10", k = 2
//输出："0"
//解释：从原数字移除所有的数字，剩余为空就是 0 。
//
//
//
//
// 提示：
//
//
// 1 <= k <= num.length <= 10⁵
// num 仅由若干位数字（0 - 9）组成
// 除了 0 本身之外，num 不含任何前导零
//
//
// Related Topics 栈 贪心 字符串 单调栈 👍 1012 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function(num, k) {
  let res = []
  for (let i = 0; i < num.length; i++) {
    const ch = num[i]
    while (res.length > 0 && res[res.length - 1] > ch && k > 0) {
      res.pop()
      k--
    }
    res.push(ch)
  }

  if (k > 0) {
    res = res.slice(0, res.length - k)
  }

  while (res.length > 0 && res[0] === '0') {
    res = res.slice(1)
  }

  return res.join('') || '0'
};

console.log(removeKdigits('1432219', 3))
//leetcode submit region end(Prohibit modification and deletion)
