var findKthLargest = function(nums, k) {
    if (!nums || nums.length == 0 || k == 0) return []
    // if (nums.length <= k) return nums 
    debugger
    return quickSearch(nums, 0, nums.length - 1, nums.length - k)
};

function quickSearch(nums, from, to, k) {
    let j = partition(nums, from, to)
    if (j === k) {
        return nums[j]
    }

    return j > k ? quickSearch(nums, from, j - 1, k) : quickSearch(nums, j + 1, to, k)
}

function partition(nums, from, to) {
    let i = from, j = to, key = nums[from]
    if (from >= to) return
    while (i < j) {
        while(i < j && nums[j] > key) j--
        while(i < j && nums[i] <= key) i++
        if (i < j) {
            let temp = nums[i]
            nums[i] = nums[j]
            nums[j] = temp
        }
    }
    nums[from] = nums[i]
    nums[i] = key

    return j
}

// let arr = [6,1,2,7,9,3,4,5,10,8]
// let arr = [0, 0, 1, 1, 2, 3, 0, 3]
// let arr = [3,2,1,5,6,4]
let arr = [2, 1]
let res = findKthLargest(arr, 2)
console.log(res)