// 法一：排序，然后找到数组中间位置的元素即可
// 时间复杂度O(nlogn),空间复杂度O(1)
var majorityElement = function(nums) {
    nums.sort()
    let mid = parseInt(nums.length / 2)
    return nums[mid]
};

// 法二： 摩尔投票法
// 核心理念为正负抵消
var majorityElement = function(nums) {
    let vote = 0, x = 0
    // for (let i = 0; i < nums.length; i++) {
    //     if (vote === 0) x = nums[i]
    //     vote += nums[i] === x ? 1 : -1
    // }

    nums.forEach(num => {
        if (vote === 0) x = num
        vote = vote + (num === x ? 1 : -1)
    });
    return x
};

console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]))