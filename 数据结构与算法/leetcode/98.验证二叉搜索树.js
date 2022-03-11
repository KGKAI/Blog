/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function (root) {
    // 使用中序遍历的迭代写法
    const stack = [];
    let node = root;
    let inorder = -Infinity;// 记录上一个节点的值
    // 当node为空时，说明以其为根结点的子树已经看完了，
    // 此时需要看它的父节点了
    while (node || stack.length) {
        while (node) {
            stack.push(node);
            node = node.left;
        }
        node = stack.pop();
        if (node.val <= inorder) return false;
        inorder = node.val;
        node = node.right;
    }

    return true;
};
// @lc code=end

