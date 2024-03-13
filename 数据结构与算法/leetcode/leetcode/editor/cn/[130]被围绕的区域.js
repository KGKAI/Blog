//给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充
//。
//
//
//
//
//
//
//
// 示例 1：
//
//
//输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O",
//"X","X"]]
//输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
//解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都
//会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
//
//
// 示例 2：
//
//
//输入：board = [["X"]]
//输出：[["X"]]
//
//
//
//
// 提示：
//
//
// m == board.length
// n == board[i].length
// 1 <= m, n <= 200
// board[i][j] 为 'X' 或 'O'
//
//
// Related Topics 深度优先搜索 广度优先搜索 并查集 数组 矩阵 👍 1095 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
  // 1、从边界上的'O'开始，将与边界上'O'直接或间接相连的'O'标记为'A'
  // 这样网格里就存在'X' 'A' 'O'
  // 2、遍历整个网格，将'A'还原为'O',将'O'变为'X'
  const m = board.length
  const n = board[0].length
  for (let i = 0; i < m; i++) {
    dfs(board, i, 0) // 左
    dfs(board, i, n - 1) // 右
  }
  for (let j = 0; j < n; j++) {
    dfs(board, 0, j)
    dfs(board, m - 1, j)
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X'
      } else if (board[i][j] === 'A') {
        board[i][j] = 'O'
      }
    }
  }
};

function dfs(board, x, y) {
  if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) return
  if (board[x][y] !== 'O') return
  board[x][y] = 'A'

  dfs(board, x - 1, y)
  dfs(board, x + 1, y)
  dfs(board, x, y - 1)
  dfs(board, x, y + 1)
}
//leetcode submit region end(Prohibit modification and deletion)
