/**
 * 
 * 假设牌型一定是符合实际的
 * 无法组成顺子的情况：
 * 1. [1, 2, 3, 4, 6] // 不连续
 * 2. [1, 2, 3, 4, 4] // 有重复牌
 *
 * 能组成顺子的情况：
 * 1. [1, 2, 3, 4, 5] // 连续
 * 2. [0, 1, 2, 3, 5] // 有大小王的情况 [0, 0, 1, 2, 4]
 *
 * 遍历nums，记录最大值和最小值，如果最大值与最小值的差值小于5并且无重复值，则为顺子；否则不是顺子
 * @param nums
 * @returns {boolean}
 */
 function isStraight(nums) {
    let max = -1, min = 14;
    // 判断是否有重复值
    const map = new Map()
    for (let i = 0; i < nums.length; i++) {
        // 遇到大小王先跳过
        if (nums[i] === 0) continue;
        // 有重复值一定不是顺子
        if (map.get(nums[i])) return false;
        // 寻找最大值和最小值
        max = Math.max(max, nums[i]);
        min = Math.min(min, nums[i]);

        map.set(nums[i], 1);
    }

    return max - min < 5;
}

console.log(isStraight([0, 0, 2, 3, 7]))