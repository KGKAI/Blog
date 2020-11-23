/**
 * 根据一棵树的前序遍历与中序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
 */

/**
 * 构造二叉树类题目，一般是使用递归的方式去解决
 * 此题与最大二叉树解法相同，关键是找出根节点
**/
var buildTree = function(preorder, inorder) {
    return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1)
};

function build(preorder,preStart, preEnd, inorder, inStart, inEnd) {
    if (preStart > preEnd) return null

    let rootVal = preorder[preStart]
    let root = new TreeNode(rootVal)
    // 找到根节点在中序遍历中的索引
    let inOrderIndex = inorder.indexOf(rootVal)
    let leftSize = inOrderIndex - inStart

    root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, inOrderIndex - 1) 
    root.right = build(preorder, preStart + leftSize + 1, preEnd, inorder, inOrderIndex + 1, inEnd)
    return root
}