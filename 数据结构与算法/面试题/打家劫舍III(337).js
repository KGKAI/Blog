function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

let root = new TreeNode(2)
let node1 = new TreeNode(1)
root.left = node1
let node2 = new TreeNode(3)
root.right = node2
let node3 = new TreeNode(4)
node1.right = node3

var rob = function(root) {
    if (!root) return 0;

    let money = root.val;
    if (root.left) {
        money += (rob(root.left.left) + rob(root.left.right));
    }

    if (root.right) {
        money += (rob(root.right.left) + rob(root.right.right));
    }

    let temp = rob(root.left) + rob(root.right)
    // console.log(money, temp)
    return Math.max(money, rob(root.left) + rob(root.right));
};

console.log(rob(root))