//某班级 n 位同学的学号为 0 ~ n-1。点名结果记录于升序数组 records。假定仅有一位同学缺席，请返回他的学号。
//
//
//
// 示例 1:
//
//
//输入: records = [0,1,2,3,5]
//输出: 4
//
//
// 示例 2:
//
//
//输入: records = [0, 1, 2, 3, 4, 5, 6, 8]
//输出: 7
//
//
//
// 提示：
//
// 1 <= records.length <= 10000
//
// Related Topics 位运算 数组 哈希表 数学 二分查找 👍 425 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} records
 * @return {number}
 */
var takeAttendance = function(records) {
  let l = 0
  let r = records.length - 1
  debugger
  while (l <= r) {
    const mid = Math.floor((l + r) / 2)
    if (mid === records[mid]) {
      l = mid + 1
    } else if (mid < records[mid]) {
      r = mid - 1
    }
  }

  return l
};
takeAttendance([0,1,3,4,5,6,7,8,9])
//leetcode submit region end(Prohibit modification and deletion)
