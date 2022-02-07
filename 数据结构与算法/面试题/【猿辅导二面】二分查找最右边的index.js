// function search(nums, target) {
//     let low = 0, high = nums.length - 1, mid
//     while(low <= high) {
//         mid = parseInt((low + high) / 2)
//         if (nums[mid] === target) {
//             break;
//         } else if (nums[mid] < target){
//             low = mid + 1
//         } else {
//             high = mid - 1
//         }
//     }
    
//     while(mid < nums.length) {
//         let temp = nums[mid + 1]
//         if (nums[mid] === temp) {
//             mid = mid + 1
//         } else {
//              return mid           
//         }
//     }
    
//     return -1
// }

function search(nums, target) {
    let low = 0, high = nums.length - 1
    while(low <= high) {
        let mid = parseInt((low + high) / 2)
        if (nums[mid] === target && nums[mid + 1] !== target) {
            return mid
        } else if (nums[mid] <= target) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return -1
}
console.log(search([1, 2, 3, 3, 6, 7, 7, 7, 9], 7))