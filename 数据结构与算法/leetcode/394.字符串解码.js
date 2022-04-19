/*
 * @lc app=leetcode.cn id=394 lang=javascript
 *
 * [394] 字符串解码
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    let res = '';
    let multiStack = [];
    let charStack = [];
    let multi = 0;
    for (let char of s) {
        if (char === '[') {
            multiStack.push(multi);
            charStack.push(res);
            multi = 0;
            res = '';
        } else if (char === ']') {
            let times = multiStack.pop();
            let temp = res.repeat(times);
            res = charStack.pop() + temp;
        } else if (char >= '0' & char <= '9') {
            multi = multi * 10 + parseInt(char);
        } else {
            res += char;
        }
    }

    return res;
};
// @lc code=end

