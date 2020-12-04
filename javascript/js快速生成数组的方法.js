let nums = [1, 2, 3, 4, 5, 6]

// 数组中每个元素 * 2
let arr1 = Array.from(nums, (v, index) => v * 2)

// 快速生成n个都是1的元素
let arr2 = new Array(nums.length).fill(1)
console.log(arr2)