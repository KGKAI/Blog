function lengthOfLIS(nums) {
    let dp = new Array(nums.length).fill(1)
    let res = 0
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
                res = Math.max(dp[i], res)
            }
        }
    }

    // let res = 0
    // for (let i = 0; i < dp.length; i++) {
    //     res = Math.max(res, dp[i])
    // }

    return res
}

let nums = [1, 4, 3, 4, 2, 3]
console.log(lengthOfLIS(nums))