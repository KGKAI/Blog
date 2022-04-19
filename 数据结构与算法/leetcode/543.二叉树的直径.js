/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    // 求二叉树的直径即为求该二叉树某个节点为起点的经过的最大节点数 - 1
    // 定义一个变量ans，记录过程中dnode路径节点数的最大值,结果即为ans - 1
    // 假设节点node的最大节点数为dnode，则其等于 左子树的最大深度L + 右子树的最大深度R + 1
    // 该节点的深度为max(L, R) + 1

    let ans = 0;
    depth(root);
    return ans - 1;
    function depth(root) {
        if (!root) return 0;

        let L = depth(root.left);   // 左子树的最大深度
        let R = depth(root.right);  // 右子树的最大深度
        ans = Math.max(ans, L + R + 1);

        return Math.max(L, R) + 1;
    }
};
// @lc code=end

