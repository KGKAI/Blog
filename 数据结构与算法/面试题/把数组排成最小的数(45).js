// 这道题的关键是排序
// 先将两数x,y转换成字符串，若x + y > y + x, 则x > y; 若x + y < y + x，则 x < y
// 例如：3和30 => 330 > 303,则3 > 30
var minNumber = function(nums) {
    nums.sort((a, b) => {
        let a1 = a + '', b1 = b + ''
        return (a1 + b1) - (b1 + a1)
    })
    
    return nums.join('')
};

console.log(minNumber([3,30,34,5,9]))