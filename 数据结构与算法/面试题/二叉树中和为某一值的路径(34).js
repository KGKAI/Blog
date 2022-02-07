// 先序遍历，用一个path数组来保存遍历过程中遇到的数据
function pathSum(root, sum) {
    if (!root) return []
    let paths = []
    search(root, sum, 0, [], paths)
    return paths
}
function search(node, sum, tempSum, path, paths) {
    if (!node) return 
    tempSum += node.val
    let newPath = path.slice()
    newPath.push(node.val)
    if (tempSum === sum && !node.left && !node.right) {
        paths.push(newPath)
    }
    node.left && search(node.left, sum, tempSum, newPath, paths)
    node.right && search(node.right, sum, tempSum, newPath, paths)
}