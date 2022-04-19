/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    // 前缀和 + 回溯
    // key是前缀和，value是和为key的前缀和的路径的数量
    const prefixCount = new Map();
    // 前缀和为0的一条路径
    prefixCount.set(0, 1);
    return dfs(root, 0);

    function dfs(root, currSum) {
        // bad case
        if (!root) {
            return 0;
        }

        let ret = 0;
        // 加上当前节点的值
        currSum += root.val;
        // 截止到当前节点，路径和为target的数量
        ret += prefixCount.get(currSum - targetSum) || 0;

        //  递归回溯
        prefixCount.set(currSum, (prefixCount.get(currSum) || 0) + 1);
        ret += dfs(root.left, currSum);
        ret += dfs(root.right, currSum);
        prefixCount.set(currSum, prefixCount.get(currSum) - 1);

        return ret;
    }
};
// @lc code=end

