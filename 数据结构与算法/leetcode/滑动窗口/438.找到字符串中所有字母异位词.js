/*
 * @lc app=leetcode.cn id=438 lang=javascript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    let left = 0, right = 0;
    let window = {}, need = {};
    for (let char of p) {
        need[char] ? need[char]++ : need[char] = 1
    }
    let res = [], match = 0;
    const count = Object.keys(need).length;

    while (right < s.length) {
        let char = s[right];
        right++;
        window[char] ? window[char]++ : window[char] = 1;
        if (need[char] === window[char]) {
            match++;
        }

        while (right - left >= p.length) {
            // 这里判断找到了目标子串
            if (match === count) {
                res.push(left);
            }

            let lc = s[left];
            left++;
            if (window[lc] === need[lc]) {
                match--;
            }
            window[lc]--;
        }
    }

    return res
};
// @lc code=end

