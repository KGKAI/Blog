/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let fast = slow = head;
    while (n-- > 0) {
        fast = fast.next;
    }

    // 如果已经走到链表的结尾，证明链表只有n个节点，删除倒数第n个
    // 即删除第一个
    if (fast === null) {
        return head.next;
    }

    // 让fast走到最后一个节点，则slow和fast中间的节点即要被删除的节点
    while (fast && fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return head;
};
// @lc code=end

