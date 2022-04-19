/*
 * @lc app=leetcode.cn id=678 lang=javascript
 *
 * [678] 有效的括号字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 * 
 * 括号匹配类的问题一如既往的使用栈，如果一个栈不行，那就两个
 * 本题维护两个栈，一个栈leftStack用来存储'('，一个栈starStack用来存储'*'
 * 解题步骤：遍历字符串，
 * 1. 如果遇到'('，则将此字符串对应的下标入leftStack
 * 2. 如果遇到'*'，将此字符串对应的下标推入starStack
 * 3. 如果遇到')',
 *      a. 优先匹配左栈的'('
 *      b. 如果左栈为空，则匹配星栈
 *      c. 如果左、星栈都为空，说明匹配不上，return false
 * 
 * 4. 在遍历完成后，左栈和星栈可能都不为空，此时需要匹配这两个栈
 * 左栈的'('一定要出现在星栈的'*'之前，否则无法匹配
 * 5. 最后若左栈为空，证明匹配成功；若左栈不为空，证明有'('无法匹配，整个字符串不是有效的。为什么不判断星栈呢？因为*可以是空字符串，空字符串被认为是合法的，所以不一定要匹配。
 */
var checkValidString = function (s) {
    const leftStack = [], starStack = [];
    // 对应题解中的1、2、3
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            leftStack.push(i)
        } else if (s[i] === '*') {
            starStack.push(i)
        } else if (s[i] === ')') {
            if (leftStack.length) {
                leftStack.pop()
            } else if (starStack.length) {
                starStack.pop();
            } else {
                return false;
            }
        }
    }

    while (leftStack.length && starStack.length) {
        const leftIndex = leftStack.pop();
        const starIndex = starStack.pop();
        if (leftIndex > starIndex) {
            return false;
        }
    }

    return leftStack.length === 0
};

console.log(checkValidString('((*)'))
// @lc code=end

