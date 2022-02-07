/**
 * 
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

说明：不允许修改给定的链表。
 */

 // 指定两个指针，快指针每次走两步，慢指针每次走一步，如果有环，那么在某个时间点快指针一定会追上慢指针
 // 设满指针走k步，则快指针走2k步，快指针比慢指针多走的是环的长度的整数倍，记为nb
 // 接下来让快指针回到链表起点，双指针每次走一步，当他们相遇时，相遇的节点就是环的入口
var detectCycle = function(head) {
    let fast = slow = head
    while (true) {
        if (!fast || !fast.next) return null    // 没有环
        fast = fast.next.next
        slow = slow.next

        if(fast === slow) break
    }

    fast = head
    while(slow !== fast) {
        fast = fast.next
        slow = slow.next
    }

    return slow
};