/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var countSubstrings = function(s) {
    let count = 0;
    for (let i = 0; i < s.length; i++) {
        compute(s, i, i);
        compute(s, i, i + 1);
    }

    function compute(s, l, r) {
        while(l >= 0 && r < s.length && s[l] === s[r]) {
            count++;
            l--;
            r++;
        }

    }

    return count;
};
// @lc code=end

