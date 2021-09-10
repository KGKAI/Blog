/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }

    function dfs(grid, x, y) {
        // 超出数组范围，结束
        if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return;
        // 不是陆地，表示水或者已经被访问过，结束
        if (grid[x][y] === '0') return;
        // 表示已经访问过了
        grid[x][y] = '0';

        dfs(grid, x - 1, y)
        dfs(grid, x + 1, y)
        dfs(grid, x, y - 1)
        dfs(grid, x, y + 1)

    }

    return count;
};
// @lc code=end

