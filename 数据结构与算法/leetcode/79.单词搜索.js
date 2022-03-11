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
var exist = function (board, word) {
    const m = board.length, n = board[0].length;
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const visited = new Array(m).fill(false).map(() => new Array(n).fill(false));
   
    // 定义： 在(i,j)位置上的字符， begin代表word的第begin个字符
    function dfs(i, j, begin) {
        // 字符不相等
        if (board[i][j] !== word[begin]) return;
        // 已经访问过，退出
        // 遍历到完整的字符串，可以放回了
        if (begin === word.length - 1) {
            return true;
        }

        visited[i][j] = true;
        for (let [x, y] of directions) {
            const newX = i + x, newY = j + y;
            // 边界情况
            if (newX < 0 || newX >= m || newY < 0 || newY >= n || visited[newX][newY]) continue;
            if (dfs(newX, newY, begin + 1)) {
                return true;
            }
        }
        visited[i][j] = false;

        return false;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // 可以从网格的任意位置出发
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
};
// @lc code=end

