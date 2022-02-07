/*
 * @lc app=leetcode.cn id=652 lang=javascript
 *
 * [652] 寻找重复的子树
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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
    let map = new Map();
    let res = [];
    tranverse(root);
    function tranverse(node) {
        if (!node) {
            return '#';
        }

        let key = node.val + ',' + tranverse(node.left) + tranverse(node.right)

        let count = map.get(key) || 0;
        if (count === 1) {
            res.push(node)
        }

        map.set(key, count + 1)
        return key;
    }

    return res;
};
// @lc code=end

