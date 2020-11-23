/**
 * 根据一棵树的中序遍历与后序遍历构造二叉树。

注意:
你可以假设树中没有重复的元素。

例如，给出

中序遍历 inorder = [9,3,15,20,7]
后序遍历 postorder = [9,15,7,20,3]
返回如下的二叉树：

    3
   / \
  9  20
    /  \
   15   7
 */

var buildTree = function(inorder, postorder) {
    return build(inorder, 0, inorder.length - 1, postorder, 0, postorder.length - 1)
};

function build(inorder, inStart, inEnd, postorder, postStart, postEnd) {
    if (inStart > inEnd) return null

    let rootVal = postorder[postEnd]
    let index = inorder.indexOf(rootVal)

    let root = new TreeNode(rootVal)
    let leftSize = index - inStart
    root.left = build(inorder, inStart, index - 1, postorder, postStart, postStart + leftSize - 1)
    root.right = build(inorder, index + 1, inEnd, postorder, postStart + leftSize, postEnd - 1)

    return root
}