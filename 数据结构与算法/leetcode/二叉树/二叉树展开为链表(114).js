/**
 * 给定一个二叉树，原地将它展开为一个单链表。
 * 例如，给定二叉树

    1
   / \
  2   5
 / \   \
3   4   6
将其展开为：

1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6

 */

// 递归方法，整体分为三步:(后序遍历)
// 1.分别将左子树和右子树展开
// 2.将左子树作为父节点的右子树
// 3.将原先右子树接到新的右子树的末端
var flatten = function(root) {
   if (!root) return

   // 1.
   flatten(root.left)
   flatten(root.right)
   // 2.
   let left = root.left
   let right = root.right
   root.left = null
   root.right = left
   // 3.
   let p = root
   while(p.right) {
      p = p.right
   }
   p.right = right
}

// 中序遍历变体方法
var flatten = function(root) {
   if (!root) return

   let curr = root, pre = curr
   let stack = []
   while(stack.length || curr) {
      while(curr) {
         if (curr.right) {
            stack.push(curr.right)
         }
         curr.right = curr.left
         curr.left = null
         pre = curr
         curr = curr.right
      }
      let node = stack.pop()
      pre.right = node
      curr = node
   }
}