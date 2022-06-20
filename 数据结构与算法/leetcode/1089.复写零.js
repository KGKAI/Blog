/*
 * @lc app=leetcode.cn id=1089 lang=javascript
 *
 * [1089] 复写零
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */
var duplicateZeros = function (arr) {
    const n = arr.length;
    // 使用双指针保存位置。i每次走一步，j遇到0走两步，给复写留下空间，j遇到非0走一步
    let i = 0, j = 0;
    while (j < n) {
        if (arr[i] === 0) {
            j += 2;
        } else {
            j++;
        }
        i++;
    }
    // 超过了该被截取的最后一位，所以倒退一位
    i--;
    j--;
    while (i >= 0) {
        // 即使倒退了一位，j仍然可能是n（该被截取的最后一位是0）
        if (j < n) arr[j] = arr[i];
        if (arr[i] === 0 && --j >= 0) arr[j] = 0;
        i--;
        j--;
    }
};
// @lc code=end
