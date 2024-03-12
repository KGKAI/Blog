//m*n 的二维数组 plants 记录了园林景观的植物排布情况，具有以下特性：
//
//
// 每行中，每棵植物的右侧相邻植物不矮于该植物；
// 每列中，每棵植物的下侧相邻植物不矮于该植物。
//
//
//
//
// 请判断 plants 中是否存在目标高度值 target。
//
//
//
// 示例 1：
//
//
//输入：plants = [[2,3,6,8],[4,5,8,9],[5,9,10,12]], target = 8
//
//输出：true
//
//
//
//
// 示例 2：
//
//
//输入：plants = [[1,3,5],[2,5,7]], target = 4
//
//输出：false
//
//
//
//
// 提示：
//
//
// 0 <= n <= 1000
// 0 <= m <= 1000
//
//
// 注意：本题与主站 240 题相同：https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
//
//
//
// Related Topics 数组 二分查找 分治 矩阵 👍 1027 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} plants
 * @param {number} target
 * @return {boolean}
 */
var findTargetIn2DPlants = function(plants, target) {
  if (!plants.length) return false
  const m = plants.length
  const n = plants[0].length
  let i = 0, j = n - 1
  while(i < m && j >= 0) {
    const num = plants[i][j]
    if (target === num) {
      return true
    } else if (num > target) {
      j--
    } else {
      i++
    }
  }
  return false
};
//leetcode submit region end(Prohibit modification and deletion)
