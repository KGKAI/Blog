/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
    // 原地修改 
    const n = nums.length;
    // 遍历nums，每遇到一个数x，就让nums[x - 1]增加n。
    // 由于nums所有数均在[1,n]范围内，所以增加后的数一定大于n。
    // 最后遍历nums，若nums[i]未大于n，就说明没有遇到过数i + 1
    for (const num of nums) {
        // 有可能num已经增加过n，所以需要取模
        const x = (num - 1) % n;
        nums[x] += n;
    }
    let res = []
    for (const [i, num] of nums.entries()) {
        if (num <= n) {
            res.push(i + 1);
        }
    }

    return res;
};
// @lc code=end

