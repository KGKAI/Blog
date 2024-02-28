//以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返
//回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
//
//
//
// 示例 1：
//
//
//输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
//输出：[[1,6],[8,10],[15,18]]
//解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
//
//
// 示例 2：
//
//
//输入：intervals = [[1,4],[4,5]]
//输出：[[1,5]]
//解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
//
//
//
// 提示：
//
//
// 1 <= intervals.length <= 10⁴
// intervals[i].length == 2
// 0 <= starti <= endi <= 10⁴
//
//
// Related Topics 数组 排序 👍 2236 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
  const res = []
  intervals.sort((interval1, interval2) => interval1[0] - interval2[0])
  let start = intervals[0][0], end = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] > end) { // 后面区间的start大于前面区间的end,说明是不是连续的
      res.push([start, end]) // 保存前面区间的结果
      start = intervals[i][0]
      end = intervals[i][1]
    } else {
      end = Math.max(end, intervals[i][1])
    }
  }

  res.push([start, end])

  return res
};

// console.log(merge([[1,3],[2,6],[8,10],[15,18]]))
//leetcode submit region end(Prohibit modification and deletion)
