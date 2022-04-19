/*
 * @lc app=leetcode.cn id=821 lang=javascript
 *
 * [821] 字符的最短距离
 */

// @lc code=start
/**
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 * 两次遍历
 * 第一次遍历找出每个元素左边最近的c，第二次找出每个元素右边最近的c，取最小值
 * ans初始化为s.length,方便做最小值比较
 */
var shortestToChar = function(s, c) {
    const n = s.length;
    const ans = new Array(n).fill(n);

    for (let i = 0, index = -1; i < n; i++) {
        // index记录c上一次在左边出现的位置
        if (s[i] === c) index = i;
        if (index !== -1) ans[i] = i - index;
    }

    for (let i = n - 1, index = -1; i >= 0; i--) {
        // index记录右边上一次出现c的位置
        if (s[i] === c) index = i;
        if (index !== -1) ans[i] = Math.min(ans[i], index - i)
    }
    return ans;
};
// @lc code=end

