/**
 * initialize your data structure here.
 */
var MinStack = function() {
    this.stack = []
    this.minNum = undefined
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
    if(this.minNum === undefined) {
        this.minNum = x
    } else {
        this.minNum = this.minNum > x ? x : this.minNum
    }
    this.stack.push(x)
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    return this.stack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    return this.minNum
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */


let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.min())   
console.log(minStack.pop())
console.log(minStack.top())
console.log(minStack.min())