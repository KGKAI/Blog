/**
 * 给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

初始状态下，所有 next 指针都被设置为 NULL。

示例：
**/

// 递归解法
// 递归解法的难点是将题目的要求转换成每个节点应该做的事情
// 本题要填充每个节点的下一个右侧节点指针，实际上是连接每个相邻的节点，那题目的关键是如何连接跨越父节点的两个相邻子节点
// 那么就需要两两相连了
var connect = function(root) {
    if (!root) return null 
    connectTwoNode(root.left, root.right)
    return root
 };

 function connectTwoNode(node1, node2) {
     if (!node1 || !node2) return 

     node1.next = node2
     // 先连接相同父节点的子节点
     connectTwoNode(node1.left, node1.right)
     connectTwoNode(node2.left, node2.right)
     // 再连接跨越父节点的相邻子节点
     connectTwoNode(node1.right, node2.left)
 }

 // 层序遍历解法
 var connect = function(root) {
    if (!root) return null;

    let queue = [root]
    while(queue.length) {
        let temp = []
        for (let i = 0; i < queue.length; i++) {
            let curr = queue[i]
            curr.next = i + 1 < queue.length ? queue[i+1] : null

            if (curr.left) {
                temp.push(curr.left)
                temp.push(curr.right)
            }
        }
        queue = temp
    }

    return root
};