// 法一 遍历数组，使用set或者map
// 法二 如果是没有重复的，那么0~n-1的范围内，i和nums[i]的值应该设相等的，那么我们就可以
// 重排数组，将nums[i]和i放到响应的位置，等到下一个不对应的位置出现时，
var findRepeatNumber = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        debugger
        while(nums[i] !== i) {
            if (nums[i] === nums[nums[i]]) {
                return nums[i]
            }
            let temp = nums[i]
            nums[i] = nums[temp]
            nums[temp] = temp
        }
    }
    return -1
};

console.log(findRepeatNumber([2, 3, 1, 2, 5, 3]))                                                                                            