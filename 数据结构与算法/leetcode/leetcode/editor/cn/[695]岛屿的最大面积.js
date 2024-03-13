//给你一个大小为 m x n 的二进制矩阵 grid 。
//
// 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都
//被 0（代表水）包围着。
//
// 岛屿的面积是岛上值为 1 的单元格的数目。
//
// 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
//
//
//
// 示例 1：
//
//
//输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,
//0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,
//0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
//输出：6
//解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
//
//
// 示例 2：
//
//
//输入：grid = [[0,0,0,0,0,0,0,0]]
//输出：0
//
//
//
//
// 提示：
//
//
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 50
// grid[i][j] 为 0 或 1
//
//
// Related Topics 深度优先搜索 广度优先搜索 并查集 数组 矩阵 👍 1058 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  const m = grid.length
  const n = grid[0].length
  let maxArea = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        maxArea = Math.max(maxArea, dfs(grid, i, j))
      }
    }
  }
  return maxArea
};

function dfs(grid, x, y) {
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return 0
  if (grid[x][y] !== 1) return 0
  grid[x][y] = 2

  return dfs(grid, x - 1, y) + dfs(grid, x + 1, y) + dfs(grid, x, y - 1) + dfs(grid, x, y + 1) + 1

}
//leetcode submit region end(Prohibit modification and deletion)
