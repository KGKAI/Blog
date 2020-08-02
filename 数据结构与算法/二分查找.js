let arr = [1, 2, 3, 4, 5, 6, 7, 8]

function BinarySearch(arr, target, low, high) {
    if (low > high) {
        return -1
    }

    let mid = parseInt((low + high) / 2)
    if (arr[mid] > target) {
        return BinarySearch(arr, target, low, mid - 1)
    } else if (arr[mid] < target) {
        return BinarySearch(arr, target, mid + 1, high)
    } else {
        return mid;
    }
}

console.log(BinarySearch(arr, 5, 0, arr.length - 1))

// function BinarySearch(arr, target) {
//     let low = 0, high = arr.length - 1
//     while(low <= high) {
//         let mid = parseInt((low + high) / 2)
//         if (arr[mid] === target) {
//             return mid
//         } else if (arr[mid] > target) {
//             high = mid - 1
//         } else if (arr[mid] < target) {
//             low = mid + 1
//         }
//     }
//     return -1;
// }

// console.log(BinarySearch(arr, 10));