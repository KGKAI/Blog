/*
 * @lc app=leetcode.cn id=76 lang=javascript
 *
 * [76] 最小覆盖子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    // 滑动窗口解法
    let left = 0, right = 0;
    // window是窗口，need代表目标字符串所有字符出现的长度
    let window = {}, need = {};
    let match = 0;
    for (let c of t) {
        need[c] = need[c] ? need[c] + 1 : 1;
    }

    const count = Object.keys(need).length;
    let start = 0, len = Infinity;
    while (right < s.length) {
        // 不管三七二十一，先增大窗口
        const c = s[right];
        right++;
        window[c] = window[c] ? window[c] + 1 : 1;
        // 判断窗口里是否有和目标字符串里某个字符数量相匹配的字符
        if (window[c] === need[c]) {
            match++;
        }
        // 缩小窗口的条件是窗口里已经包含了满足条件的字字符串
        while (match === count) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            
            // 缩小窗口
            const lc = s[left];
            left++;
            if (window[lc] === need[lc]) {
                match--;
            }
            window[lc]--;
        }
    }

    return len === Infinity ? '' : s.substr(start, len);
};
// @lc code=end

