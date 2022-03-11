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

// https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by--26/

// 迭代方式
// 维护一个变量记录上一个访问的节点，该节点的右子树为当前节点，左子树为null
// 右子树先入栈，左子树后入栈
// var flatten = function (root) {
//     if (!root) return;
//     const stack = [root];
//     let prev = null;
//     while (stack.length) {
//         const node = stack.pop();
//         if (prev) {
//             prev.left = null;
//             prev.right = node;
//         }
//         if (node.right) {
//             stack.push(node.right);
//         }
//         if (node.left) {
//             stack.push(node.left);
//         }
//         prev = node;
//     }
// };

// 1. 找到已当前节点为根结点的左子树的最右边节点A，以当前节点的右子树作为A的右子树
// 2. 将左子树插入到右子树的地方
var flatten = function (root) {
    while (root) {
        if (!root.left) {
            root = root.right;
        } else {
            let pre = root.left;
            while (pre.right) {
                pre = pre.right;
            }
            pre.right = root.right;
    
            root.right = root.left;
            root.left = null;
    
            root = root.right;
        }
    }
};
// @lc code=end

