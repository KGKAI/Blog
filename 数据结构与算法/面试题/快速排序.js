function quickSort(arr, from, to) {
    // 以第一个元素为基准元素
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

// function quickSort(arr) {
//     // 阮一峰版，相对容易理解
//     if (arr.length <= 1) return arr;
//     let l = 0, r = arr.length - 1;
//     let pivotIndex = l + Math.floor((r - l) / 2);
//     let pivot = arr.splice(pivotIndex, 1)[0];
  
//     let left = [], right = [];
//     for (let i = 0; i < arr.length; i++) {
//       if (arr[i] < pivot) {
//         left.push(arr[i]);
//       } else {
//         right.push(arr[i]);
//       }
//     }
  
//     return quickSort(left).concat(pivot, quickSort(right));
// }
  
// let arr = [6,1,2,7,9,3,4,5,10,8]
let arr = [10, 9, 8,7,6,5,4,3,2,1]
quickSort(arr, 0, arr.length - 1)
console.log(arr)