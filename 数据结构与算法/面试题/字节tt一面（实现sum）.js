// 标题
// 链式调用+延迟计算

// 题目描述
// 请看下方的题目，先实现问题1，再实现问题2，或阐述问题2的核心实现思路​

// 问题1：​
// 写一个加法函数sum，支持：​
// ​
// sum(1)(2)(3,4)() // 输出10​​​
// ​

// 问题2：​
// 写一个加法函数sum，支持​
// ​
// console.log(sum(1)(2)(3,4)(5)) // 打印出15​​​


sum(1)(3); // 调用两次后，计算结果输出 4​

// sum(1)(2)(3, 4)() // 输出10

// function sum() {
//     let preArgs;
//     const args = [].slice.call(arguments, 0)
//     if (args.length > 0) {
//         preArgs = (preArgs || []).concat(args)
//         return sum
//     } else {
//         let sum = 0;
//         for (const arg of preArgs) {
//             sum += arg;
//         }
//         console.log(sum)
//     }

//     return args;
// }

function sum() {
    let total = 0;
    for (const num of [...arguments]) {
        total += num;
    }

    function _sum() {
        const args = [...arguments];
        if (args.length > 0) {
            for (const num of args) {
                total += num;
            }

            return _sum;
        } else {
            console.log(total)
        }
    }

    return _sum;
}

sum(1)(2)()
