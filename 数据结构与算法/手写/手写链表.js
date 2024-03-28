class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }
  append(value) {
    const node = new Node(value)
    if (!this.head) {
      this.head = node
    } else {
      let cur = this.head
      while(cur.next) {
        cur = cur.next
      }
      cur.next = node
    }
    this.length++
  }
  remove(value) {
    if (!this.length) return
    if (this.head.value === value) {
      this.head = this.head.next
      return
    }
    let cur = this.head
    let pre = this.head
    while(cur) {
      if (value === cur.value) {
        pre.next = cur.next
        cur = null
        break
      } else {
        pre = cur
        cur = cur.next
      }
    }
    this.length--
  }
}

const list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)
list.remove(2)
console.log(list)
console.log(list)
