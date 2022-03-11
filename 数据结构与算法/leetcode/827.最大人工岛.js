/*
 * @lc app=leetcode.cn id=827 lang=javascript
 *
 * [827] 最大人工岛
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    // 标记每个岛屿的面积
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                dfs(grid, i, j);
            }
        }
    }

    function dfs(grid, i, j) {
        if (i < 0 || i >= m || y < 0 || y >= n) {
            
        }
    }
};
// @lc code=end

