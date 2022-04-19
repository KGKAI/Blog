/*
 * @lc app=leetcode.cn id=1663 lang=javascript
 *
 * [1663] 具有给定数值的最小字符串
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 * 
 * 贪心算法
 * 从n开始，判断是否能装下n-1个z，如果k > 26 * (n - 1)，说明能放下n-1个z
 * 又由于是按顺序存放，所以先放bound对应的字符
 * 如果放不下，则放a
 */
var getSmallestString = function(n, k) {
    let ans = '';
    for (let rest = n; rest >= 1; rest--) {
        const bound = k - 26 * (rest - 1);
        if (bound > 0) {
            ans += String.fromCharCode('a'.charCodeAt() + bound - 1);
            k -= bound;
        } else {
            ans += 'a';
            k -= 1;
        }
    }

    return ans;
};
// @lc code=end

