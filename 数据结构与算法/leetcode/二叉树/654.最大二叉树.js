/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function (nums) {
    if (!nums.length) return null;
    // 找到最大值
    let max = -Infinity, index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > max) {
            max = nums[i];
            index = i;
        }
    }

    let root = new TreeNode(max);
    root.left = constructMaximumBinaryTree(nums.slice(0, index));
    root.right = constructMaximumBinaryTree(nums.slice(index + 1))

    return root;
};
// @lc code=end

