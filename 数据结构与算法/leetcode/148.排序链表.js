/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
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
 * @return {ListNode}
 */
var sortList = function (head) {
    return mergeSort(head, null);

    function mergeSort(head, tail) {
        if (!head) {
            return head;
        }
        if (head.next === tail) {
            head.next = null;
            return head;
        }
        
        let fast = head, slow = head;
        while (fast !== tail) {
            fast = fast.next;
            slow = slow.next;
            if (fast !== tail) {
                fast = fast.next;
            }
        }
        const mid = slow;
        return merge(mergeSort(head, mid), mergeSort(mid, tail))
    }

    function merge(head1, head2) {
        let head = new ListNode(0), ptr = head;
        while (head1 && head2) {
            if (head1.val < head2.val) {
                ptr.next = head1;
                head1 = head1.next;
            } else {
                ptr.next = head2;
                head2 = head2.next;
            }
            
            ptr = ptr.next;
        }
        if (head1) {
            ptr.next = head1;
        } else if (head2) {
            ptr.next = head2;
        }

        return head.next;
    }
};
// @lc code=end

