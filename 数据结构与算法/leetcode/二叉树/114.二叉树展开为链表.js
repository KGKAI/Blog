/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    if (!root) return;

    // 先展开左子树和右子树
    flatten(root.left)
    flatten(root.right)

    let left = root.left;
    let right = root.right;

    // 根节点的右节点应该为展开后的左子树
    root.left = null;
    root.right = left;
    // 把左子树和右子树拼接起来
    let p = root;
    while (p.right) {
        p = p.right;
    }
    p.right = right;
};
// @lc code=end

