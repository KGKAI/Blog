/*
 * @lc app=leetcode.cn id=221 lang=javascript
 *
 * [221] 最大正方形
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    // dp[i][j]表示以(i, j)为右下角，且只包含1的正方形的最大边长。
    // 如果该位置为0， 则不可能组成正方形，可以通过初始化为0来实现
    // 如果该位置为1
    //   badcase：在边界部分i===0 || j === 0，最大边长只能是1
    //   否则，根据木桶理论，寻找该位置上方、左上方、左方的最小值 + 1
    const m = matrix.length;
    const n = matrix[0].length;
    const dp = new Array(m).fill(0).map(_ => new Array(n).fill(0));
    let maxSide = 0
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '1') {
                if (i === 0 || j === 0) {
                    dp[i][j] = 1;
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
                }
                maxSide = Math.max(maxSide, dp[i][j])
            }
        }
    }

    return maxSide * maxSide;
};
// @lc code=end

