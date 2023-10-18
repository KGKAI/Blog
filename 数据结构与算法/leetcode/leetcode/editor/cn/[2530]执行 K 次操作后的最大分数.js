/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxKelements = function(nums, k) {
  const queue = new PriorityQueue1()
  for (const num of nums) {
    queue.enqueue(num)
  }

  let res = 0
  while (k--) {
    const num = queue.dequeue()
    res += num
    queue.enqueue(Math.ceil(num / 3))
  }

  return res
};

class PriorityQueue1 {
  constructor() {
    this.queue = []
  }

  enqueue(val) {
    this.queue.push(val)
    this.shiftUp(this.queue.length - 1)
  }

  dequeue() {
    this.swap(0, this.queue.length - 1)
    const element = this.queue.pop()
    this.shiftDown(0)
    return element
  }

  shiftUp(k) {
    while (k >= 1 && this.queue[k] > this.queue[Math.floor((k - 1) / 2)]) {
      this.swap(k, Math.floor((k - 1) /2))
      k = Math.floor((k - 1) / 2)
    }
  }

  shiftDown(k) {
    while (2 * k + 1 < this.queue.length) {
      let left = 2 * k + 1 // 左子元素
      if (left + 1 < this.queue.length && this.queue[left] < this.queue[left + 1]) { // 找到左右子元素较大的值
        left += 1
      }
      if (this.queue[left] > this.queue[k]){
        this.swap(left, k)
      }

      k = left
    }
  }

  swap(left, right) {
    [this.queue[left], this.queue[right]] = [this.queue[right], this.queue[left]]
  }
}
