/*
 * @lc app=leetcode.cn id=56 lang=javascript
 *
 * [56] 合并区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 * 首先按照start[i]升序排序
 * 遍历intervals,设res的最后一个元素为last
 *  - 当last[1]小于当前元素的left，不能合并，需要push当前元素进res
 *  - 当last[1]大于或者等于当前元素的left，可以合并，更新last[1]的值为right和last[1]的最大值
 *  - 返回res
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

