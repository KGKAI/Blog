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

// 寻找左侧边界的二分搜索
// 其实就是个开闭区间的问题
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1
    while(left <= right) {
        let mid = parseInt((left + right) / 2)
        if (arr[mid] === target && arr[mid-1] !== target) {
            return mid
        } else if (arr[mid] >= target) {
            right = mid - 1
        } else if (arr[mid] < target) {
            left = mid + 1
        }
    }

    return -1
}

console.log(binarySearch([1,2,2,2,3,3], 4))

// 寻找右侧边界的二分搜索
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1
    while(left <= right) {
        let mid = parseInt((left + right) / 2)
        if (arr[mid] === target && arr[mid+1] !== target) {
            return mid
        } else if (arr[mid] > target) {
            right = mid - 1
        } else if (arr[mid] <= target) {
            left = mid + 1
        }
    }

    return -1
}

console.log(binarySearch([1,2,2,2,3,3,6], 4))