//给定一个头节点为 head 的链表用于记录一系列核心肌群训练项目编号，请查找并返回倒数第 cnt 个训练项目编号。
//
//
//
// 示例 1：
//
//
//输入：head = [2,4,7,8], cnt = 1
//输出：8
//
//
//
// 提示：
//
//
// 1 <= head.length <= 100
// 0 <= head[i] <= 100
// 1 <= cnt <= head.length
//
//
//
//
// Related Topics 链表 双指针 👍 512 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} cnt
 * @return {ListNode}
 */
var trainingPlan = function(head, cnt) {
  let first = head, second = head
  while (cnt) {
    first = first.next
    cnt--
  }
  while (first) {
    first = first.next
    second = second.next
  }

  return second
};
//leetcode submit region end(Prohibit modification and deletion)
