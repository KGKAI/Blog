function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let node3 = new TreeNode(3)
let node1 = new TreeNode(1)
let node4 = new TreeNode(4)
let node2 = new TreeNode(2)

node3.left = node1
node3.right = node4

node1.right = node2

// 迭代
function kthLargest(root, k) {
    debugger
    let stack = []
    let node = root
    while(stack.length || node) {
        if (node) {
            stack.push(node)
            node = node.right
        } else {
            node = stack.pop()
            k--
            if (k == 0) return node.val
            node = node.left
        }
    }
    return -1
}