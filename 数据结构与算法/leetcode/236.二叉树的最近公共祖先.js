/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// 自底向上的递归解法
// 如果p或q之一等于root，则直接返回root，比较上一层
// 如果left和right都不为空，则root为最小公公祖先，返回root
// 如果left或者right为空，返回相对侧的值
// 如果left和right都为空，返回null
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root;
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    if (!left && !right) return null;
    if (!left) return right;
    if (!right) return left;
    return root;
};
// @lc code=end

