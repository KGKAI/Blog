let arr = [1, 2, 3, , 5]
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i])
// }

// arr.forEach(item => console.log(item))

// for (let key in arr) {
//     console.log(arr[key])
// }

// for (let value of arr) {
//     console.log(value)
// }

// arr.test = 'test'
// console.log(arr)
// var containsNearbyDuplicate = function(nums, k) {
//     let map = new Map()
//     for (let i = 0; i < nums.length; i++) {
//         if (!map.has(nums[i])) {
//             map.set(nums[i], i)
//         } else {
//             let index = map.get(nums[i])
//             if(Math.abs(index - i) <= k) {
//                 return true
//             } else {
//                 map.set(nums[i], i)
//             }
//         }
//     }

//     return false
// };

var containsNearbyDuplicate = function(nums, k) {
    let set = new Set()
    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true
        set.add(nums[i])
        if (set.size > k) set.delete(nums[i - k])
    }

    return false
};

console.log(containsNearbyDuplicate([1,2,3,1,3], 2))