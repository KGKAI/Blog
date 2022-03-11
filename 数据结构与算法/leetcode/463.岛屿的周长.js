/*
 * @lc app=leetcode.cn id=463 lang=javascript
 *
 * [463] 岛屿的周长
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                return dfs(grid, i, j);
            }
        }
    }

    function dfs(grid, i, j) {
        // 越界，表示到达了外围水域，+1
        if (i < 0 || i >= m || j < 0 || j >= n) return 1;
        // [海洋格子]， +1
        if (grid[i][j] === 0) return 1;
        // 遇到已遍历过的陆地，和周长没关系
        if (grid[i][j] !== 1) return 0;
        grid[i][j] = 2;

        return dfs(grid, i - 1, j) +
            dfs(grid, i + 1, j) +
            dfs(grid, i, j - 1) + dfs(grid, i, j + 1);
    }
};
// @lc code=end

