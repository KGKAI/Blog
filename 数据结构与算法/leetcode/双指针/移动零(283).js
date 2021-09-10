/**
 *
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
 */

// 快慢指针，快指针遇到非零数字赋值给慢指针，慢指针++
// 这样操作之后，将慢指针之后的所有数字直接赋值为零，即得到结果
var moveZeroes = function(nums) {
    let fast = slow = 0
    while (fast < nums.length) {
        if (nums[fast] !== 0) {
            nums[slow++] = nums[fast]
        }
        fast++
    }

    while (slow < nums.length) {
        nums[slow++] = 0
    }
};

var moveZeroes = function(nums) {
    for (let i = 0, j = 0; j < nums.length; j++) {
        if (nums[j] !== 0) {
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
            i++
        }
    }
};
// let nums = [0,1,0,3,12]
let nums = [2, 1, 0, 7, 0, 5, 3, 0]
moveZeroes(nums)
console.log(nums)