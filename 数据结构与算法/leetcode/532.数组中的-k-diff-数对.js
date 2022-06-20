/*
 * @lc app=leetcode.cn id=532 lang=javascript
 *
 * [532] 数组中的 k-diff 数对
 */

// @lc code=start
/**
 * 思路：用一个集合visited保存遍历过程中出现的数字，当遍历到后边的数字时，
 * 判断num - k 和num + k是否已经存在visited中
 * 如果存在，则将数对中较小的数字放到结果集Set res中，以此达到去重的目的。
 * 
 * visited用map或者set都可以
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findPairs = function (nums, k) {
    const visited = new Set();
    const res = new Set();
    for (const num of nums) {
        if (visited.has(num - k)) {
            // num - k和num组成数对，将较小的num-k放到结果集
            res.add(num - k);
        }
        if (visited.has(num + k)) {
            // num和num + k组成数对，将较小的num放到结果集
            res.add(num);
        }
        // 遍历过程中将当前数字保存起来供后续使用
        visited.add(num);
    }

    return res.size;
};
// @lc code=end

