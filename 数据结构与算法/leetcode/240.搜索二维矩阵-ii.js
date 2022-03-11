/*
 * @lc app=leetcode.cn id=240 lang=javascript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */

// Z字形查找
// 从右上角(0, n - 1)开始查找，如果找到，return true;
// 如果matrix[i][j] > target, 
// 时间复杂度O(m+n)，空间复杂度O(1)
 var searchMatrix = function (matrix, target) {
    const m = matrix.length;
    const n = matrix[0].length;
    let i = 0, j = n - 1;
    while (i >= 0 && i < m && j >= 0 && j < n) {
        if (matrix[i][j] === target) {
            return true;
        } else if (matrix[i][j] < target) {
            i++;
        } else if (matrix[i][j] > target) {
            j--;
        }
    }

    return false;
};
// @lc code=end

