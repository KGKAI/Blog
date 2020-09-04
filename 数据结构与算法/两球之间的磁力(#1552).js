// 找最大值或者最小值首先想到的应该是二分查找
var maxDistance = function(position, m) {
    // 1. 先排序，以便使用最大值和最小值，求出间隔的最大值和最小值
    // 间隔的最大值是数组最大值-数组最小值 / (m -1), 最小值是1
    position.sort((a, b) => a - b)
    let high = (position[position.length-1] - position[0]) / (m - 1) 
    let low = 1
    let res = 1
    // 2. 二分查找，如果作为距离的中间值满足要求，则保留这个mid值，继续逼近
    while(low <= high) {
        let mid = parseInt((low + high) / 2)
        if (check(position, mid, m)) {
            res = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    
    return res
};

function check(position, distance, m) {
    let count = 1, i = 0
    for (let j = 1; j < position.length; j++) {
        if (position[j] - position[i] >= distance) {
            i = j
            count++
            if (count === m) return true
        }
    }

    return false
}

console.log(maxDistance([1,2,3,4,7], 3))