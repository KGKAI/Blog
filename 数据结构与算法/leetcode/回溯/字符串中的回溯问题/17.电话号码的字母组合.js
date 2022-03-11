/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    const res = [];
    if (!digits.length) return res;
    const map = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    const path = [];

    function recursive(start) {
        if (path.length === digits.length) {
            res.push(path.join(''));
            return;
        }
        for (let i = start; i < digits.length; i++) {
            const chars = map[digits[i]];
            for (let j = 0; j < chars.length; j++) {
                path.push(chars[j]);
                recursive(i + 1);
                path.pop();
            }
        }
    }

    recursive(0);
    return res;
};
// @lc code=end

