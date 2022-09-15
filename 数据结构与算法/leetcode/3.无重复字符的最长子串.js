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
var lengthOfLongestSubstring = function (s) {
    // window保存每个字符出现的字数
    const window = {};
    let left = 0, right = 0;
    let max = 0;
    while (right < s.length) {
        const char = s[right];
        right++;
        window[char] = (window[char] || 0) + 1;
        while (window[char] > 1) {
            const leftChar = s[left];
            window[leftChar]--;
            left++;
        }
        let len = right - left;
        max = Math.max(max, len);
    }

    return max;
}
// @lc code=end

