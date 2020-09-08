var missingNumber = function(nums) {
    let l = 0, r = nums.length - 1, mid = 0
    while(l <= r) {
        mid = parseInt((l + r) / 2)
        if (mid === nums[mid]) {
            l = mid + 1
        } else if (mid < nums[mid]) {
            r = mid - 1
        }
    }

    return l
};

console.log(missingNumber([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]))