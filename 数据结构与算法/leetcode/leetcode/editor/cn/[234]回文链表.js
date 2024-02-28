//给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
//
//
//
// 示例 1：
//
//
//输入：head = [1,2,2,1]
//输出：true
//
//
// 示例 2：
//
//
//输入：head = [1,2]
//输出：false
//
//
//
//
// 提示：
//
//
// 链表中节点数目在范围[1, 10⁵] 内
// 0 <= Node.val <= 9
//
//
//
//
// 进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
//
// Related Topics 栈 递归 链表 双指针 👍 1866 👎 0


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
 * @return {boolean}
 */
var isPalindrome = function(head) {
  let slow = head, fast = head
  while (fast.next && fast.next.next) {
    fast = fast.next.next
    slow = slow.next
  }
  let firstHalf = slow
  let secondHalf = reverseList(firstHalf.next)
  let p1 = head
  let p2 = secondHalf
  while (p2) {
    if (p1.val !== p2.val) return false
    p1 = p1.next
    p2 = p2.next
  }

  return true
};
function reverseList(head) {
  let cur = head
  let pre = null

  while (cur) {
    const next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  return pre
}
//leetcode submit region end(Prohibit modification and deletion)
