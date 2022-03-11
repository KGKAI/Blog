/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
    return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);

    function helper(preorder, start1, end1, inorder, start2, end2) {
        if (start1 > end1 || start2 > end2) return null;

        const rootVal = preorder[start1];
        const index = inorder.indexOf(rootVal);
        const root = new TreeNode(rootVal);
        root.left = helper(preorder, start1 + 1, start1 + 1 + index - start2 - 1, inorder, start2, index - 1);
        root.right = helper(preorder, start1 + index - start2 + 1, end1, inorder, index + 1, end2);
        return root;
    }
};
// @lc code=end

