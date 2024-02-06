//给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
//
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
//
// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
//
//
//
// 示例 1:
//
//
//输入: [3,2,1,5,6,4], k = 2
//输出: 5
//
//
// 示例 2:
//
//
//输入: [3,2,3,1,2,4,5,5,6], k = 4
//输出: 4
//
//
//
// 提示：
//
//
// 1 <= k <= nums.length <= 10⁵
// -10⁴ <= nums[i] <= 10⁴
//
//
// Related Topics 数组 分治 快速选择 排序 堆（优先队列） 👍 2322 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  return quickSearch(nums, 0, nums.length - 1, nums.length - k);

  function quickSearch(nums, from, to, index) {
    if (from >= to) return nums[from];
    let i = from, j = to, key = nums[from];
    while (i < j) {
      while (i < j && nums[j] > key) j--;
      while (i < j && nums[i] <= key) i++;
      if (i < j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
      }
    }
    nums[from] = nums[i];
    nums[i] = key;

    if (i === index) {
      return nums[i];
    }

    return i > index ? quickSearch(nums, from, i - 1, index) : quickSearch(nums, i + 1, to, index);
  }
};
console.log(findKthLargest([1,2,3,4,5,6,7,7,7,7,7,7,7,8,9], 2))
//leetcode submit region end(Prohibit modification and deletion)
