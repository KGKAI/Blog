/*
 * @lc app=leetcode.cn id=695 lang=javascript
 *
 * [695] 岛屿的最大面积
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    let area = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                area = Math.max(area, dfs(grid, i, j));
            }
        }
    }

    function dfs(grid, x, y) {
        if (x < 0 || x >= m || y < 0 || y >= n) return 0;
        if (grid[x][y] !== 1) return 0;
        grid[x][y] = 2;
        return 1 + dfs(grid, x - 1, y) + dfs(grid, x + 1, y) + dfs(grid, x, y - 1) + dfs(grid, x, y + 1);
    }

    return area;
};
// @lc code=end

