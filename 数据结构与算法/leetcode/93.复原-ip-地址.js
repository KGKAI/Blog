/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    const res = [], path = []
    dfs(s, 0, 4);
    function dfs(s, begin, rest) {
        if (begin === s.length) {   // 说明已经遍历完了
            if (rest === 0) {
                res.push(path.join('.'))
                return;
            }
        }

        for (let i = begin; i < begin + 3; i++) {
            if (i >= s.length) return;

            if (rest * 3 < s.length - i) return;

            if (judge(s, begin, i)) {
                path.push(s.slice(begin, i + 1))
                dfs(s, i + 1, rest - 1)
                path.pop()
            }
        }
    }

    function judge(s, left, right) {
        let len = right - left + 1;
        if (len > 1 && s.charAt(left) === '0') return false
        const str = s.slice(left, right + 1)
        return +str >= 0 && +str <= 255;
    }
    return res;
};
// @lc code=end

