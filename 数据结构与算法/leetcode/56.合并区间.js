/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    intervals.sort((interval1, interval2) => interval1[0] - interval2[0]);
    const res = [];
    for (let i = 0; i < intervals.length; i++) {
        const [left, right] = intervals[i];
        if (!res.length || res[res.length - 1][1] < left) {
            res.push(intervals[i]);
        } else {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], right);
        }
    }

    return res;
};
// @lc code=end

