/*
 * @lc app=leetcode.cn id=392 lang=javascript
 *
 * [392] 判断子序列
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 
 * 双指针
 * 因为是判断s是否是t的子序列，所以以s为基准
 * 在while循环里不断遍历s和t
 * 如果遇到s[i] === t[j] 匹配的数量+1 ，i++， j++
 * 如果s[i] !== t[j] j++
 * 最后返回匹配的数量是否等于s的长度
 */
var isSubsequence = function(s, t) {
    const m = s.length, n = t.length;
    let i = 0, j = 0;
    while (i < m && j < n) {
        // 如果找到了，s指针后移，t也后移
        if (s[i] === t[j]) {
            i++;
        }
        // 如果没找到，t后移
        j++;
    }

    return i === m;
};
// @lc code=end

