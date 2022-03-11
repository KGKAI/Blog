/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if (!this.map.has(key)) {
        return -1;
    }
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    // 存在key的话就先删除，并设置key
    if (this.map.has(key)) {
        this.map.delete(key)
    }
    this.map.set(key, value);
    // 然后判断设置后的map大小是否超出了容量，如果超出了，就删除第一个
    // 第一个元素的key: map.entries().next().value[0]
    if (this.map.size > this.capacity) {
        this.map.delete(this.map.entries().next().value[0]);
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

