/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 * 
 * Next Greater Number类问题，可以用单调递减栈来解决(自栈底到栈顶单调递减)
 * 这个问题可以这样思考，把数组的元素想象成一个个并排站立的人，数组的元素想象成人的身高。
 * 这些人面对你站立。如何求元素[2]的Next Greater Number呢？很简单，元素[2]后面能看见的第一个人就是
 * 下一个最大元素，因为小于等于[2]的人都被[2]挡住了，所以是看不到的。
 * 这就是单调栈的模板。for循环从后往前扫描，因为是栈结构，所以倒着入栈，正着出栈。（从前往后扫描也可，最终都是单点递减栈）
 * while循环把当前元素[2]和更高个之间的个子小于等于元素[2]的人排除，因为他们的存在没意义。
 * 最后把元素[2]入栈，开始下一次循环。
 * 
 * 回到本题，我们要求的是'距离'，所以栈里应该保存'下标'。
 */
 var dailyTemperatures = function(temperatures) {
    let res = [];
    let stack = [];
    for (let i = temperatures.length - 1; i >= 0; i--) {
        while(stack.length > 0 && temperatures[stack[stack.length - 1]] <= temperatures[i]) {
            // 栈顶的元素比当前看到的元素小，那就没必要看了，出栈
            stack.pop();
        }

        res[i] = stack.length ? stack[stack.length - 1] - i : 0;
        // 因为是要求距离，所以栈里保存的是下标
        stack.push(i);
    }

    return res;
};
// @lc code=end

