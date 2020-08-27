var twoSum = function(nums, target) {
    let res = []
    for (let i = 0; i < nums.length; i++) {
        let temp = target - nums[i]
        let index = nums.indexOf(temp)
        if (index > -1 && i < index) {
            res.push([nums[i], temp])
        }
    }
    return res
};

console.log(twoSum([2,7,4,5,11,15], 9))