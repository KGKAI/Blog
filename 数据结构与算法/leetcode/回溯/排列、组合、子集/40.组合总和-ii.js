/*
 * @lc app=leetcode.cn id=40 lang=javascript
 *
 * [40] 组合总和 II
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

// 1、要找出不重复的组合，首先想到的就是给数组排序，也能够方便操作
// 2、但只排序是不够的，由于数组中的元素只能使用一次，所以要使用begin来记录每次遍历的起点。同时要注意下一次循环的
//    起点是i + 1
// 3、上述两步仍然是不够的，因为可能存在1，1'，2，5这种情况，在找出1，2，5后，1',2,5仍然是符合要求的解，
//    所以可以用 i > begin && nums[i] === nums[i - 1]来去重
// 4、同一层数值相同的结点第 22、33 ... 个结点，因为数值相同的第 11 个结点已经搜索出了包含了这个数值的全部结果，
// 同一层的其它结点，候选数的个数更少，搜索出的结果一定不会比第 11 个结点更多，并且是第 11 个结点的子集。
var combinationSum2 = function(candidates, target) {
    candidates.sort((a, b) => a - b)
    const res = [];
    const path = [];
    recursive(0, 0);
    function recursive(begin, sum) {
        if (sum === target) {
            res.push([...path])
            return;
        }

        for (let i = begin; i < candidates.length; i++) {
            if (sum + candidates[i] > target) {
                break
            }

            if (i > begin && candidates[i] === candidates[i - 1]) {
                continue
            }
            path.push(candidates[i])
            recursive(i + 1, sum + candidates[i])
            path.pop()
        }
    }

    return res;
};
// @lc code=end

