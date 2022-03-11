/*
 * @lc app=leetcode.cn id=128 lang=javascript
 *
 * [128] 最长连续序列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
 var longestConsecutive = function (nums) {
    const set = new Set(nums);
    let res = 0;
     for (const num of set) {
         if (!set.has(num - 1)) { // 如果没有这一步判断，时间复杂度是O(n2);如果x - 1存在，那么x的结果一定不可能比x-1好
             let count = 0;
             let curNum = num;
             while (set.has(curNum)) {
                 count++;
                 curNum++;
             }
             res = Math.max(res, count);
        }
    }
    return res;
};

// var longestConsecutive = function(nums) {
//     let num_set = new Set();
//     for (const num of nums) {
//         num_set.add(num);
//     }

//     let longestStreak = 0;

//     for (const num of num_set) {
//         if (!num_set.has(num - 1)) {
//             let currentNum = num;
//             let currentStreak = 1;

//             while (num_set.has(currentNum + 1)) {
//                 currentNum += 1;
//                 currentStreak += 1;
//             }

//             longestStreak = Math.max(longestStreak, currentStreak);
//         }
//     }

//     return longestStreak;   
// };
// @lc code=end

