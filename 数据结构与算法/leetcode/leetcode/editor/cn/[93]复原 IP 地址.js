//有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
//
//
// 例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312"
//和 "192.168@1.1" 是 无效 IP 地址。
//
//
// 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新
//排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
//
//
//
// 示例 1：
//
//
//输入：s = "25525511135"
//输出：["255.255.11.135","255.255.111.35"]
//
//
// 示例 2：
//
//
//输入：s = "0000"
//输出：["0.0.0.0"]
//
//
// 示例 3：
//
//
//输入：s = "101023"
//输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
//
//
//
//
// 提示：
//
//
// 1 <= s.length <= 20
// s 仅由数字组成
//
//
// Related Topics 字符串 回溯 👍 1386 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const res = []

  function dfs(path, index) {
    if (path.length === 4 && index === s.length) {
      res.push(path.join('.'))
      return
    }

    for (let i = index; i < index + 3; i++) {
      if (i >= s.length) return
      const str = s.slice(index, i + 1)
      if (judge(str)) {
        path.push(str)
        dfs(path, i + 1)
        path.pop()
      }
    }
  }

  function judge(str) {
    const len = str.length
    if (len > 3) return false
    if (len > 1 && str[0] === '0') return false
    let sum = 0;
    for (let i = 0; i < len; i++) {
      sum = sum * 10 + Number(str[i])
    }
    if (sum > 255) return false
    return true
  }

  dfs([], 0)

  return res
};

console.log(restoreIpAddresses("101023"))
//leetcode submit region end(Prohibit modification and deletion)
