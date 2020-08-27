var singleNumbers = function(nums) {
    let k = 0   // 先得到数组中所有数字异或的结果，即a和b异或的结果
    for (let i = 0; i < nums.length; i++) {
        k ^= nums[i]
    }

    let div = 1
    // 找到异或结果中第一位1
    while((k & div) === 0) {
        div = div << 1
    }
    let a = 0, b = 0
    for (let j = 0; j < nums.length; j++) { // a和b必然不在同一组中，相同的元素必然在同一组中
        if ((div & nums[j]) === 0) {
            a ^= nums[j]
        } else {
            b ^= nums[j]
        }
    }

    return [a, b]
};

console.log(singleNumbers([6,2,3,3]))