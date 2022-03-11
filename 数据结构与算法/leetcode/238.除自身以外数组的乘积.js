/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 * 
 * 最简单的方法是先求nums[i]所有数字的乘积m，然后遍历nums[i],用m除以nums[i]，即为answer[i]，不过解决不了元素0的问题，且题目也不允许用除法
 * 
 * 方法是维护左右两个数组L和R，然后计算L[i]和R[i]的乘积即为answer[i]
 * L[i]代表i左侧所有数字的乘积，R[i]代表的是i右侧所有数字的乘积
 * 对于数组L,L[0]应该是1，因为0左侧没有任何元素，L[i] = L[i-1] * nums[i-1]
 * 对于数组R,R[length - 1]应该是1，因为length-1右侧没有任何元素，R[i] = R[i+1] * nums[i+1]
 */
 var productExceptSelf = function(nums) {
    const answer = new Array(nums.length);

    answer[0] = 1;
    for (let i = 1; i < nums.length; i++) {
        answer[i] = answer[i - 1] * nums[i - 1];
    }

    // 用一个变量来代替right数组，R代表i右侧的乘积
    let R = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        answer[i] = answer[i] * R;
        R = nums[i] * R;
    }

    return answer;
};
// @lc code=end

