var binaryTreePaths = function(root) {
  let paths = []
  _search(root, '', paths)
  return paths
};

function _search(node, path, paths) {
  if (!node) return
  path += node.val 
  if (!node.left && !node.right) {
      paths.push(path)
  } else {
       path += '->'
       node.left && _search(node.left, path, paths)
       node.right && _search(node.right, path, paths)
  }
}