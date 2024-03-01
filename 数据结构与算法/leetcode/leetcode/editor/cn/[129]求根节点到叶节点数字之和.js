//给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
//
//
//
// 每条从根节点到叶节点的路径都代表一个数字：
//
//
//
//
// 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
//
//
// 计算从根节点到叶节点生成的 所有数字之和 。
//
// 叶节点 是指没有子节点的节点。
//
//
//
// 示例 1：
//
//
//输入：root = [1,2,3]
//输出：25
//解释：
//从根到叶子节点路径 1->2 代表数字 12
//从根到叶子节点路径 1->3 代表数字 13
//因此，数字总和 = 12 + 13 = 25
//
// 示例 2：
//
//
//输入：root = [4,9,0,5,1]
//输出：1026
//解释：
//从根到叶子节点路径 4->9->5 代表数字 495
//从根到叶子节点路径 4->9->1 代表数字 491
//从根到叶子节点路径 4->0 代表数字 40
//因此，数字总和 = 495 + 491 + 40 = 1026
//
//
//
//
// 提示：
//
//
// 树中节点的数目在范围 [1, 1000] 内
// 0 <= Node.val <= 9
// 树的深度不超过 10
//
//
// Related Topics 树 深度优先搜索 二叉树 👍 724 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
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
var sumNumbers = function(root) {
  if (!root) return 0
  let sum = 0
  const dfs = (node, path) => {
    if (!node) return
    path += node.val
    if (!node.left && !node.right) {
      let len = path.length
      let cur = 0
      for (let i = 0; i < len; i++) {
        cur = cur * 10 + Number(path[i])
      }
      sum += cur
      return
    }
    if (node.left) {
      dfs(node.left, path)
    }
    if (node.right) {
      dfs(node.right, path)
    }
  }
  dfs(root, '')
  return sum
};
//leetcode submit region end(Prohibit modification and deletion)
