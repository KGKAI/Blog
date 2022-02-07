/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let left = 0, right = 0;
    let len = 0;
    let window = {};
    while (right < s.length) {
        let c = s[right];
        right++;
        window[c] ? window[c]++ : window[c] = 1;
        while (window[c] > 1) {
            let lc = s[left];
            left++;
            window[lc]--;
        }
        len = Math.max(right - left, len);
    }

    return len;
};
// @lc code=end

