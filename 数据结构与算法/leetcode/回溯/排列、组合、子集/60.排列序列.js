/*
 * @lc app=leetcode.cn id=60 lang=javascript
 *
 * [60] 排列序列
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */

// 元素无重复 全排列 
var getPermutation = function(n, k) {
    const path = [];
    const nums = [];
    for (let i = 0; i < n; i++) {
        nums.push(i + 1)
    };
    let count = 0;
    function recursive() {
        if (path.length === n) {
            count++
            return;
        }

        for (let i = 0; i < n; i++) {
            if (!path.includes(nums[i])) {
                path.push(nums[i])
                recursive()
                if (count === k) {
                    break;
                }
                path.pop()
            }
        }
    }

    recursive()
    return path.join('');
};
// @lc code=end

