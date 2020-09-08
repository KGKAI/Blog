/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stackA = []
    this.stackB = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    this.stackA.push(x)
    if (this.stackB.length === 0) {
        this.stackB.push(x)
    } else {
        let node = this.stackB[this.stackB.length - 1]
        if (x <= node) {
            this.stackB.push(x)
        }
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    let node = this.stackA.pop()
    if (node === this.stackB[this.stackB.length - 1]) {
        this.stackB.pop()
    }
    return node
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stackA[this.stackA.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.stackB[this.stackB.length - 1]
};

// ["MinStack","push","push","push","top","pop","min","pop","min","pop","push","top","min","push","top","min","pop","min"]
// [[],[2147483646],[2147483646],[2147483647],[],[],[],[],[],[],[2147483647],[],[],[-2147483648],[],[],[],[]]
let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.min())
console.log(minStack.pop())
console.log(minStack.top())
console.log(minStack.min())