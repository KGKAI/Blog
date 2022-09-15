/*
 * @lc app=leetcode.cn id=513 lang=javascript
 *
 * [513] 找树左下角的值
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
// var findBottomLeftValue = function (root) {
//     const queue = [root];
//     let lastLeft = null;
//     while (queue.length) {
//         const length = queue.length;
//         lastLeft = queue[0];
//         for (let i = 0; i < length; i++) {
//             const node = queue.shift();
//             if (node.left) queue.push(node.left)
//             if (node.right) queue.push(node.right)
//         }
//     }

//     return lastLeft && lastLeft.val
// };

// BFS
var findBottomLeftValue = function (root) {
    const queue = [root];
    let lastLeft = null;
    while (queue.length) {
        const node = queue.shift();
        lastLeft = node.val;
        if (node.right) queue.push(node.right)
        if (node.left) queue.push(node.left);
    }

    return lastLeft
};

// @lc code=end

