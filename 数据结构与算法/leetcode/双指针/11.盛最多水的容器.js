/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let l = 0, r = height.length - 1;
    let res = 0
    while (l < r) {
        const area = Math.min(height[l], height[r]) * (r - l);
        res = Math.max(res, area);
        if (height[l] < height[r]) {
            l++
        } else {
            r--
        }
    }

    return res;
};
// @lc code=end

