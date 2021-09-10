/*
 * @lc app=leetcode.cn id=733 lang=javascript
 *
 * [733] 图像渲染
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    let oldColor = image[sr][sc];
    dfs(image, sr, sc, oldColor, newColor)
    
    function dfs(image, x, y, oldColor, newColor) {
        // 判断是否超出数组范围，这个比较简单
        if (x < 0 || x >= image.length || y < 0 || y >= image[0].length) {
            return;
        }

        // 颜色不相同，说明超出了色块的区域
        if (image[x][y] !== oldColor) { return; }

        // 如果已经被访问过，跳过
        // 也可以使用一个visited数组来记录
        if (image[x][y] === newColor) { return; }

        image[x][y] = newColor;

        dfs(image, x - 1, y, oldColor, newColor);   // 上
        dfs(image, x + 1, y, oldColor, newColor);   // 下
        dfs(image, x, y - 1, oldColor, newColor);   // 左
        dfs(image, x, y + 1, oldColor, newColor);   // 右
    }
    
    return image
};
// @lc code=end

