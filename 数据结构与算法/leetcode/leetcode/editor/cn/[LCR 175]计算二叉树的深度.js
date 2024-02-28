//某公司架构以二叉树形式记录，请返回该公司的层级数。
//
//
//
// 示例 1：
//
//
//
//
//输入：root = [1, 2, 2, 3, null, null, 5, 4, null, null, 4]
//输出: 4
//解释: 上面示例中的二叉树的最大深度是 4，沿着路径 1 -> 2 -> 3 -> 4 或 1 -> 2 -> 5 -> 4 到达叶节点的最长路径上有 4
//个节点。
//
//
//
//
// 提示：
//
//
// 节点总数 <= 10000
//
//
// 注意：本题与主站 104 题相同：https://leetcode-cn.com/problems/maximum-depth-of-binary-
//tree/
//
//
//
// Related Topics 树 深度优先搜索 广度优先搜索 二叉树 👍 269 👎 0


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
var calculateDepth = function(root) {
  if (!root) return 0
  const queue = [root]
  let depth = 0
  while(queue.length) {
    depth++
    let length = queue.length
    while(length) {
      const node = queue.shift()
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
      length--
    }
  }

  return depth
};
//leetcode submit region end(Prohibit modification and deletion)
