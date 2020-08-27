var exchange = function(nums) {
    let i = 0, j = nums.length - 1
    debugger
    while (i < j) {
        while(i < j && nums[i] % 2 !== 0) i++
        while(i < j && nums[j] % 2 === 0) j--
        if (i < j) {
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
        }
    }

    return nums
};

console.log(exchange([1,2,3,4,5,6]))