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
 var letterCombinations = function (digits) {
    if (!digits) return []
    const res = []
    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    }

    const path = '', begin = 0
    function dfs(path, begin) {
        if (path.length === digits.length) {
            res.push(path)
            return;
        }
        
        // 数字对应的字符串
        const strs = map[digits[begin]];
        for (let j = 0; j < strs.length; j++) {
            const str = strs[j];
            dfs(path + str, begin + 1)
        }
    }

    dfs(path, begin)
    return res;
};
// @lc code=end

