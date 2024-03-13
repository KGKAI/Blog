//给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
//
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
//
// 此外，你可以假设该网格的四条边均被水包围。
//
//
//
// 示例 1：
//
//
//输入：grid = [
//  ["1","1","1","1","0"],
//  ["1","1","0","1","0"],
//  ["1","1","0","0","0"],
//  ["0","0","0","0","0"]
//]
//输出：1
//
//
// 示例 2：
//
//
//输入：grid = [
//  ["1","1","0","0","0"],
//  ["1","1","0","0","0"],
//  ["0","0","1","0","0"],
//  ["0","0","0","1","1"]
//]
//输出：3
//
//
//
//
// 提示：
//
//
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] 的值为 '0' 或 '1'
//
//
// Related Topics 深度优先搜索 广度优先搜索 并查集 数组 矩阵 👍 2438 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  const m = grid.length
  const n = grid[0].length
  let count = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(grid, i, j)
      }
    }
  }
  return count
};
function dfs(grid, x, y) {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return
  if (grid[x][y] !== '1') return
  grid[x][y] = '2'

  dfs(grid, x - 1, y)
  dfs(grid, x + 1, y)
  dfs(grid, x, y - 1)
  dfs(grid, x, y + 1)
}
//leetcode submit region end(Prohibit modification and deletion)
