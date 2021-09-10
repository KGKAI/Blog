/*
 * @lc app=leetcode.cn id=611 lang=javascript
 *
 * [611] 有效三角形的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// 排序 + 二分
// var triangleNumber = function(nums) {
//     const n = nums.length;
//     let ans = 0;
//     nums.sort((a, b) => a - b)
//     for (let i = 0; i < n; i++) {
//         for (let j = i + 1; j < n; j++) {
//             let left = j + 1, right = n - 1, k = j;
//             while (left <= right) {
//                 const mid = Math.floor((left + right) / 2);
//                 if (nums[i] + nums[j] <= nums[mid]) { // 不能构成三角形,说明mid取得大，向左缩小
//                     right = mid - 1;
//                 } else {    // 能构成三角形，但是不确定mid是不是最大的，所以向右 
//                     k = mid;
//                     left = mid + 1;
//                 }
//             }
//             ans += k - j;
//         }
//     }

//     return ans;
// };

// 排序 + 双指针
var triangleNumber = function(nums) {
    const n = nums.length;
    let ans = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < n; i++) {
        let k = i + 1;
        for (let j = i + 1; j < n; j++) {
            while (k + 1 < n && nums[k + 1] < nums[i] + nums[j]) {
                ++k
            }
            ans += Math.max(k - j, 0)
        }
    }
    return ans;
};
// @lc code=end

