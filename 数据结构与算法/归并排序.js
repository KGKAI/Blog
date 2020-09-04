function mergeSort(nums) {
    if (nums.length <= 1) return nums;

    let mid = Math.floor((nums.length) / 2)
    let left = mergeSort(nums.slice(0, mid))
    let right = mergeSort(nums.slice(mid, nums.length))
    return merge(left, right)
}

function merge(arr1, arr2) {
    let i = 0, j = 0, k = 0
    let res = []
    while(i < arr1.length && j < arr2.length) {
        if (arr1[i] > arr2[j]) {
            res[k++] = arr2[j++]
        } else {
            res[k++] = arr1[i++]
        }
    }

    if (i < arr1.length) {
        res = res.concat(arr1.slice(i, arr1.length))
    }
    
    if (j < arr2.length) {
        res = res.concat(arr2.slice(j, arr2.length))
    }

    return res
}

// let arr = [3, 4, 6, 1, 2, 7, 9, 5, 8]
// let arr = [2, 0, 0, 0, 0, 1]
let arr =[9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(mergeSort(arr))