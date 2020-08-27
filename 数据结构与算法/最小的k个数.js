/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
var getLeastNumbers = function(arr, k) {
    if (!arr || arr.length == 0 || k == 0) return []
    if (arr.length <= k) return arr
    return quickSearch(arr, 0, arr.length - 1, k)
};

function quickSearch(arr, from, to, k) {
    debugger
    if (from >= to) return arr.slice(0, k) 
    let j = quickSort(arr, from, to, k)
    if (j === k) {
        return arr.slice(0, k)
    }

    return j > k ? quickSearch(arr, from, j - 1, k) : quickSearch(arr, j + 1, to, k)
}

function quickSort(arr, from, to) {
    let i = from, j = to, key = arr[from]
    // if (from >= to) return -1
    while (i < j) {
        while(i < j && arr[j] > key) j--
        while(i < j && arr[i] <= key) i++

        if (i < j) {
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    arr[from] =arr[i]
    arr[i] = key

    return i
}

let arr = [0,2,8,7,6,4,5]
// let arr = [3,2,1]
// let arr = [0,1,2,1]
// let arr = [0,0,1,2,4,2,2,3,1,4]
// let arr = [0,0,2,3,2,1,1,2,0,4]
let res = getLeastNumbers(arr,5)
console.log(res)