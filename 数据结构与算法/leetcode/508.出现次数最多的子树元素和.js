/*
 * @lc app=leetcode.cn id=508 lang=javascript
 *
 * [508] 出现次数最多的子树元素和
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
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
    const map = new Map();
    let max = -Infinity;
    _find(root)
    function _find(root) {
        if (!root) return 0;
        const left = _find(root.left);
        const right = _find(root.right);

        const value = left + root.val + right;
        map.set(value, map.get(value) ? map.get(value) + 1 : 1);
        // 保存出现的最大次数
        max = Math.max(max, map.get(value));
        return value;
    }

    const res = [];
    for (const [key, value] of map.entries()) {
        if (value === max) {
            res.push(key);
        }
    }

    return res;
};
// @lc code=end