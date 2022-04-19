/*
 * @lc app=leetcode.cn id=621 lang=javascript
 *
 * [621] 任务调度器
 */

// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 * 
 * 1.先找出数量最多的任务记为A，数量为max
 * 2.初始化一个max * (n + 1)的矩阵，用A填充第一列，这样前max-1行的总时间为：
 *  (max - 1) * (n + 1)，
 * 总运行时间为：(max - 1) * (n + 1) + 1
 * 3.找出数量同样为max的任务，e.g. (B,C)，用B,C...填充第2、3...列，
 * 这样前max-1行的总时间为：(max - 1) * (n + 1)，
 * 总运行时间为(max - 1) * (n + 1) + maxCount
 * 4. 如果填超出了n + 1列，则所有的CPU待命状态其实是都可以省去的。
 * 这是因为 CPU 待命状态本身只是为了规定任意两个相邻任务的执行间隔至少为 n，但如果列数超过了 n+1，
 * 那么就算没有这些待命状态，任意两个相邻任务的执行间隔肯定也会至少为 n。
 * 此时，总执行时间就是任务的总数tasks.length
 */
var leastInterval = function (tasks, n) {
    // 1. 首先计算每个任务出现的次数
    let arr = new Array(26).fill(0);
    for (const char of tasks) {
        arr[char.charCodeAt() - 'A'.charCodeAt()]++;
    }
    // 2. 找出最大的任务数量
    let max = 0;
    for (const count of arr) {
        max = Math.max(max, count);
    }
    // 3. 计算出max - 1行的运行时间
    let res = 0;
    res = (max - 1) * (n + 1);
    // 4. 找出所有数量等于max的任务的个数maxCount
    let maxCount = 0
    for (let i = 0; i < arr.length; i++) {
        if (max === arr[i]) {
            maxCount++;
        }
    }

    return Math.max(res + maxCount, tasks.length)
};
// @lc code=end

