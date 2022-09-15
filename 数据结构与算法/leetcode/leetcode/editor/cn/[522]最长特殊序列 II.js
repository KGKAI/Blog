//给定字符串列表 strs ，返回其中 最长的特殊序列 。如果最长特殊序列不存在，返回 -1 。
//
// 特殊序列 定义如下：该序列为某字符串 独有的子序列（即不能是其他字符串的子序列）。
//
// s 的 子序列可以通过删去字符串 s 中的某些字符实现。
//
//
// 例如，"abc" 是 "aebdc" 的子序列，因为您可以删除"aebdc"中的下划线字符来得到 "abc" 。"aebdc"的子序列还包括
//"aebdc"、 "aeb" 和 "" (空字符串)。
//
//
//
//
// 示例 1：
//
//
//输入: strs = ["aba","cdc","eae"]
//输出: 3
//
//
// 示例 2:
//
//
//输入: strs = ["aaa","aaa","aa"]
//输出: -1
//
//
//
//
// 提示:
//
//
// 2 <= strs.length <= 50
// 1 <= strs[i].length <= 10
// strs[i] 只包含小写英文字母
//
// Related Topics 数组 哈希表 双指针 字符串 排序 👍 158 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} strs
 * @return {number}
 */
var findLUSlength = function(strs) {
    let max = -1;
    for (let i = 0; i < strs.length; i++) {
        let check = true;
        for (let j = 0; j < strs.length; j++) {
            if (i !== j && isSubSeq(strs[i], strs[j])) {
                check = false;
                break;
            }
        }

        if (check) {
            max = Math.max(max, strs[i].length)
        }
    }

    return max

    function isSubSeq(p, t) {
        let i = 0, j = 0;
        while (i < p.length && j < t.length) {
            if (p[i] === t[j]) {
                i++
            }
            j++;
        }

        return i === p.length;
    }
};
//leetcode submit region end(Prohibit modification and deletion)
