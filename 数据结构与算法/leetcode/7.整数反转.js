/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let res = 0;
    while (x) {
        let digit = x % 10;
        x = ~~(x / 10);
        res = res * 10 + digit;
        if (res > Math.pow(2, 31) - 1 || res < Math.pow(2, 31) * -1) {
            return 0;
        }
    }

    return res;
};
// @lc code=end

