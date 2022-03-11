/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // 中心扩散算法
    let res = '';
    for (let i = 0; i < s.length; i++) {
        // 为了解决回文串长度为奇数和偶数的情况，取最大值即可
        const s1 = compute(s, i, i);
        const s2 = compute(s, i, i + 1);
        res = res.length > s1.length ? res : s1;
        res = res.length > s2.length ? res : s2;
    }

    return res;

    function compute(s, l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }

        return s.substr(l + 1, r - l - 1)
    }
};
// @lc code=end

