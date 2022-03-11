/*
 * @lc app=leetcode.cn id=139 lang=javascript
 *
 * [139] 单词拆分
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
 var wordBreak = function (s, wordDict) {
    const len = s.length;
    const set = new Set(wordDict);
    const dp = new Array(len + 1).fill(false);
     dp[0] = true;
     for (let i = 1; i <= len; i++) {
         for (let j = 0; j < i; j++) {
             if (dp[j] && set.has(s.slice(j, i))) {
                 dp[i] = true;
                 break;
             }
         }
     }
     return dp[len];
};
// @lc code=end

