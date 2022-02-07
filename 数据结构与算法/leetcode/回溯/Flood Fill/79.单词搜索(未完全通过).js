/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
 var exist = function(board, word) {
    let m = board.length, n = board[0].length;
    const visited = [];
    const path = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(board, i, j, path, word)) {
                return true
            }
        }
    }

    function dfs(board, x, y, path, word) {
        if (path.join('') === word) return true
        if (x < 0 || x >= m || y < 0 || y >= n) return false
        if (visited[x * n + y]) return false

        path.push(board[x][y])
        visited[x * n + y] = true
        if (path.length <= word.length) {
            if (dfs(board, x - 1, y, path, word) || dfs(board, x + 1, y, path, word) || dfs(board, x, y - 1, path, word) || dfs(board, x, y + 1, path, word)) {
                return true
            }
        }
        visited[x * n + y] = false
        path.pop()
    }

    return false;
};
// @lc code=end

