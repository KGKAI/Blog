//
// 请你设计并实现一个满足
// LRU (最近最少使用) 缓存 约束的数据结构。
//
//
//
// 实现
// LRUCache 类：
//
//
//
//
//
// LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
// int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
// void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组
//key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
//
//
//
//
// 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
//
//
//
// 示例：
//
//
//输入
//["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
//[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
//输出
//[null, null, null, 1, null, -1, null, -1, 3, 4]
//
//解释
//LRUCache lRUCache = new LRUCache(2);
//lRUCache.put(1, 1); // 缓存是 {1=1}
//lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
//lRUCache.get(1);    // 返回 1
//lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
//lRUCache.get(2);    // 返回 -1 (未找到)
//lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
//lRUCache.get(1);    // 返回 -1 (未找到)
//lRUCache.get(3);    // 返回 3
//lRUCache.get(4);    // 返回 4
//
//
//
//
// 提示：
//
//
// 1 <= capacity <= 3000
// 0 <= key <= 10000
// 0 <= value <= 10⁵
// 最多调用 2 * 10⁵ 次 get 和 put
//
//
// Related Topics 设计 哈希表 链表 双向链表 👍 3084 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.cache = new Map()
  this.dummyHead = new Node()
  this.dummyTail = new Node()
  this.dummyHead.next = this.dummyTail
  this.dummyTail.prev = this.dummyHead
  this.count = 0
};

class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.prev = null
    this.next = null
  }
}
/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key)
    this.moveToHead(node)
    return node.val
  } else {
    return -1
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
    const node = this.cache.get(key)
    node.val = value
    this.moveToHead(node)
  } else {
    if (this.count === this.capacity) {
      this.removeTail()
    }
    const node = new Node(key, value)
    this.addToHead(node)
    this.cache.set(key, node)
    this.count++
  }
};

LRUCache.prototype.moveToHead = function(node) {
  this.remove(node)
  this.addToHead(node)
}

LRUCache.prototype.remove = function(node) {
  const prev = node.prev
  const next = node.next
  prev.next = next
  next.prev = prev
}

LRUCache.prototype.addToHead = function(node) {
  const firstNode = this.dummyHead.next
  node.prev = this.dummyHead
  this.dummyHead.next = node
  node.next = firstNode
  firstNode.prev = node
}

LRUCache.prototype.removeTail = function() {
  const tailNode = this.dummyTail.prev
  this.remove(tailNode)
  this.cache.delete(tailNode.key)
  this.count--
}
/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
//leetcode submit region end(Prohibit modification and deletion)
