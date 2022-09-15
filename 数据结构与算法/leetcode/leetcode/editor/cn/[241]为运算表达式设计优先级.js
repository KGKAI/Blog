//给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。
//
// 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 10⁴ 。
//
//
//
// 示例 1：
//
//
//输入：expression = "2-1-1"
//输出：[0,2]
//解释：
//((2-1)-1) = 0
//(2-(1-1)) = 2
//
//
// 示例 2：
//
//
//输入：expression = "2*3-4*5"
//输出：[-34,-14,-10,-10,10]
//解释：
//(2*(3-(4*5))) = -34
//((2*3)-(4*5)) = -14
//((2*(3-4))*5) = -10
//(2*((3-4)*5)) = -10
//(((2*3)-4)*5) = 10
//
//
//
//
// 提示：
//
//
// 1 <= expression.length <= 20
// expression 由数字和算符 '+'、'-' 和 '*' 组成。
// 输入表达式中的所有整数值在范围 [0, 99]
//
// Related Topics 递归 记忆化搜索 数学 字符串 动态规划 👍 611 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} expression
 * @return {number[]}
 */
// 记忆化搜索
const map = new Map();
var diffWaysToCompute = function(expression) {
    if (!expression) return [];
    if (map.has(expression)) {
        return map.get(expression);
    }
    // 判断exp是否是纯数字
    let index = 0;
    let number = 0;
    const result = [];
    while (index < expression.length && !isOperation(expression[index])) {
        number = number * 10 + +expression[index];
        index++;
    }
    if (index === expression.length) {
        result.push(number);
        map.set(expression, result);
        return result;
    }

    // 非纯数字，递归处理
    for (let i = 0; i < expression.length; i++) {
        if (isOperation(expression[i])) {
            const left = diffWaysToCompute(expression.slice(0, i));
            const right = diffWaysToCompute(expression.slice(i + 1));
            for (let j = 0; j < left.length; j++) {
                for (let k = 0; k < right.length; k++) {
                    const num = calculate(+left[j], expression[i], +right[k])
                    result.push(num);
                }
            }
        }
    }

    map.set(expression, result);
    return result;
};

function isOperation(char) {
    return char === '+' || char === '-' || char === '*'
}

function calculate(left, operator, right) {
    if (operator === '+') {
        return left + right
    } else if (operator === '-') {
        return left - right
    } else if (operator === '*') {
        return left * right
    }
}
//leetcode submit region end(Prohibit modification and deletion)
