//给你一个整数数组 nums，将它重新排列成 nums[0] < nums[1] > nums[2] < nums[3]... 的顺序。
//
// 你可以假设所有输入数组都可以得到满足题目要求的结果。
//
//
//
// 示例 1：
//
//
//输入：nums = [1,5,1,1,6,4]
//输出：[1,6,1,5,1,4]
//解释：[1,4,1,5,1,6] 同样是符合题目要求的结果，可以被判题程序接受。
//
//
// 示例 2：
//
//
//输入：nums = [1,3,2,2,3,1]
//输出：[2,3,1,3,1,2]
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 5 * 10⁴
// 0 <= nums[i] <= 5000
// 题目数据保证，对于给定的输入 nums ，总能产生满足题目要求的结果
//
//
//
//
// 进阶：你能用 O(n) 时间复杂度和 / 或原地 O(1) 额外空间来实现吗？
// Related Topics 数组 分治 快速选择 排序 👍 474 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/**
 * 排序 + 穿插 以[1,5,1,1,6,4]为例
 * 1、正序排序 [1, 1, 1, 4, 5, 6]
 * 2、将排序后的数组等分，A[1, 1, 1] B[4, 5, 6]。数组长度为偶数直接等分，数组长度为奇数把中间数组分到较小数组中
 * [1, 2, 3, 4, 5] => [1, 2, 3] [4, 5]
 * 3、穿插：先插入较小数组的元素，再插入较大数组的元素，得到结果[1, 4, 1, 5, 1, 6]
 * 4、但上述3步是不够的，如果排序后A数组和B数组出现了相同元素r，那么r一定是A的最大值且B的最小值。
 * 如果r出现的次数较少，那么不会有问题，例如[1,1,2,2,3,3]分割为[1,1,2]和[2,3,3] 得到的结果是[1,2,1,3,2,3]是没有问题的
 * 如果r出现的次数达到了数组长度的一半，例如[1,1,2,2,2,3]分割为[1,1,2]和[2,2,3] 得到的结果是[1,2,1,2,2,3]是有问题的
 * 要解决此种问题，需要将A和B中的r分开，可以将A和B分别倒序排序，[2,1,1]和[3,2,2] 这样得到的结果为[2,3,1,2,1,2]
 * r出现的次数超过数组长度一般是不合法的。
 *
 * 时间复杂度O(NlogN) 排序
 * 空间复杂度O(N) A和B两数组
 * @param nums
 */
var wiggleSort = function(nums) {
    nums.sort((a, b) => a - b);
    const index = Math.ceil(nums.length / 2);
    const small = nums.slice(0, index).sort((a, b) => b - a);
    const large = nums.slice(index).sort((a, b) => b - a);
    let left = 0, right = 0;
    while (left < small.length && right < large.length) {
        nums[left * 2] = small[left]
        nums[right * 2 + 1] = large[right]
        left++;
        right++;
    }

    if (left < small.length) {
        nums[nums.length - 1] = small[small.length - 1];
    }
};
//leetcode submit region end(Prohibit modification and deletion)
