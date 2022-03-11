/*
 * @lc app=leetcode.cn id=55 lang=javascript
 *
 * [55] 跳跃游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    // 最远可以到达的距离
    let rightMost = 0;
    for (let i = 0; i < nums.length; i++) {
        // 当前下标小于等于最远能够到达的距离，代表当前位置可达
        if (i <= rightMost) {
            // 计算当前位置能达到的最远距离
            rightMost = Math.max(rightMost, i + nums[i]);
            if (rightMost >= nums.length - 1) {
                return true;
            }
        }
    }

    return false;
};
// @lc code=end

