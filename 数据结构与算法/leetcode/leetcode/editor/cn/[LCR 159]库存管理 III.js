//仓库管理员以数组 stock 形式记录商品库存表，其中 stock[i] 表示对应商品库存余量。请返回库存余量最少的 cnt 个商品余量，返回 顺序不限。
//
//
//
//
// 示例 1：
//
//
//输入：stock = [2,5,7,4], cnt = 1
//输出：[2]
//
//
// 示例 2：
//
//
//输入：stock = [0,2,3,6], cnt = 2
//输出：[0,2] 或 [2,0]
//
//
//
// 提示：
//
//
// 0 <= cnt <= stock.length <= 10000 0 <= stock[i] <= 10000
//
//
//
//
// Related Topics 数组 分治 快速选择 排序 堆（优先队列） 👍 592 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} stock
 * @param {number} cnt
 * @return {number[]}
 */
var inventoryManagement = function(stock, cnt) {
  const quickSelect = (nums, left, right, index) => {
    if (left >= right) return nums.slice(0, index)
    // 取最左侧数为基准
    const pivot = nums[left]
    let i = left
    let j = right
    while (i < j) {
      while(nums[j] > pivot && i < j) j--
      while(nums[i] <= pivot && i < j) i++
      if (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
    nums[left] = nums[i]
    nums[i] = pivot

    if (i === index) {
      return nums.slice(0, index)
    }
    return i > index ? quickSelect(nums, left, i - 1, index) : quickSelect(nums, i + 1, right, index)
  }
  return quickSelect(stock, 0, stock.length - 1, cnt)
};
const arr = [0,0,1,2,4,2,2,3,1,4]
console.log(inventoryManagement(arr, 8))
console.log(arr)
//leetcode submit region end(Prohibit modification and deletion)
