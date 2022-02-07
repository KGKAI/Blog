// 核心思路：丑数的递推性质：丑数只包含2，3，5，因此有 丑数 = 某较小丑数 * 某因子（2，3，5）
// 因此下个丑数为三种情况的最小值
var nthUglyNumber = function(n) {
    let a = b = c = 0
    let dp = [1]
    for (let i = 1; i < n; i++) {
        let n2 = dp[a] * 2, n3 = dp[b] * 3, n5 = dp[c] * 5
        dp[i] = Math.min(n2, n3, n5)
        if (dp[i] === n2) a++
        if (dp[i] === n3) b++
        if (dp[i] === n5) c++
    }
    return dp[n-1]
};

console.log(nthUglyNumber(11))