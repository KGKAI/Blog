function quickSort(arr, from, to) {
    let i = from, j = to, key = arr[from]
    if(from >= to) return
    while(i < j) {
        while(i < j && arr[j] > key) j--    // j先开始，j从右往左查找，直到找到一个比key小的数，
        while(i < j && arr[i] <= key) i++    // i从左往右查找，直到找到一个比key大的数

        if (i < j) {    // 交换两个元素的位置
            let temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    arr[from] = arr[i]
    arr[i] = key

    quickSort(arr, from, i - 1)
    quickSort(arr, i + 1, to)
}

// let arr = [6,1,2,7,9,3,4,5,10,8]
let arr = [10, 9, 8,7,6,5,4,3,2,1]
quickSort(arr, 0, arr.length - 1)
console.log(arr)