/*
 * @lc app=leetcode.cn id=230 lang=javascript
 *
 * [230] 二叉搜索树中第K小的元素
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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    let res = 0;
    let rank = 0;
    tranverse(root, k)
    function tranverse(root, k) {
        if (!root) return;
        tranverse(root.left, k);
        rank++;
        if (rank === k) {
            res = root.val;
            return;
        }

        tranverse(root.right, k)
    }

    return res;
};
// @lc code=end

