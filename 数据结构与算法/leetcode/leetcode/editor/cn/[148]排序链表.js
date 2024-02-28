//给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
//
//
//
//
//
//
// 示例 1：
//
//
//输入：head = [4,2,1,3]
//输出：[1,2,3,4]
//
//
// 示例 2：
//
//
//输入：head = [-1,5,3,4,0]
//输出：[-1,0,3,4,5]
//
//
// 示例 3：
//
//
//输入：head = []
//输出：[]
//
//
//
//
// 提示：
//
//
// 链表中节点的数目在范围 [0, 5 * 10⁴] 内
// -10⁵ <= Node.val <= 10⁵
//
//
//
//
// 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
//
// Related Topics 链表 双指针 分治 排序 归并排序 👍 2240 👎 0


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
 * @return {ListNode}
 */
var sortList = function(head) {
  // 1. 生成两个新链表
  let list1 = new ListNode(-1) // 升序链表
  let list2 = new ListNode(-1) // 降序链表
  let p1 = list1, p2 = list2
  let pHead = head
  while (pHead) {
    if (pHead.val % 2 === 1) {
      p1.next = pHead
      p1 = p1.next
    } else {
      p2.next = pHead
      p2 = p2.next
    }
    pHead = pHead.next
  }
  p1.next = null
  p2.next = null
  console.log(list1.next, list2.next)

  // 2. 反转降序链表，使其变为升序
  p2 = reverseList(list2.next)
  p1 = list1.next
  console.log(p2)

  // 3. 合并两个有序链表
  return merge(p1, p2)

  function reverseList(head) {
    let curNode = head, preNode = null
    while (curNode) {
      const oriNext = curNode.next
      curNode.next = preNode
      preNode = curNode
      curNode = oriNext
    }
    return preNode
  }

  function merge(head1, head2) {
    let pHead = new ListNode(-1)
    let ptr = pHead
    while (head1 && head2) {
      if (head1.val < head2.val) {
        ptr.next = head1
        head1 = head1.next
        ptr = ptr.next
      } else {
        ptr.next = head2
        head2 = head2.next
        ptr = ptr.next
      }
    }

    if (head1) ptr.next = head1
    if (head2) ptr.next = head2
    return pHead.next
  }
};
//leetcode submit region end(Prohibit modification and deletion)
