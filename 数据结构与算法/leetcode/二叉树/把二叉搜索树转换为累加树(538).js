/**
 * 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater Tree)，
 * 使得每个节点的值是原来的节点值加上所有大于它的节点值之和。

例如：
输入: 原始二叉搜索树:
              5
            /   \
           2     13
输出: 转换为累加树:
             18
            /   \
          20     13
 */

// 反中序遍历 递归
var convertBST = function(root) {
    let sum = 0
    function traversal(node) {
        if (node != null) {
            traversal(node.right)
            sum += node.val
            node.val = sum
            traversal(node.left)
        }
    }
    traversal(root)
    return root
};

// 反中序遍历 迭代
var convertBST = function(root) {
    let sum = 0, stack = [], node = root
    while (stack.length || node) {
        if (node) {
            stack.push(node)
            node = node.right
        } else {
            let temp = stack.pop()
            sum += temp.val
            temp.val = sum
            node = temp.left
        }
    }

    return root
};
