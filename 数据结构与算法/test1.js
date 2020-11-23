// let envelops = [[2, 3], [5, 4], [1, 8], [5, 2], [6 ,7], [6, 4]]
// envelops.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0])
// console.log(envelops)
// let height = []
// for (let i = 0; i < envelops.length; i++) {
//     height[i] = envelops[i][1]
// }

// function length(nums) {
//     let piles = 0, top = []
//     for (let i = 0; i< nums.length; i++) {
//         let poker = nums[i]
//         let left = 0, right = piles
//         while (left < right) {
//             let mid = parseInt((left + right) / 2)
//             if (top[mid] >= poker) {
//                 right = mid
//             } else {
//                 left = mid + 1
//             }
//         }
//         if (left === piles) piles++
//         top[left] = poker
//     }

//     return piles
// }

// let num = length(height)
// console.log(num)

function lengthOfLIS(nums) {
    let dp = Array.from({length: nums.length}, 1)
    console.log(dp)
}
