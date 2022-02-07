// var intersect = function(nums1, nums2) {
//     let res = []
//     let map = new Map();
//     nums1.forEach(item => {
//         let count = map.get(item)
//         count = count === undefined ? 1 : count + 1
//         map.set(item, count)
//     })

//     nums2.forEach(item => {
//         let count = map.get(item);
//         if (count > 0) {
//             res.push(item)
//             count = count - 1;
//             map.set(item, count)
//         }
//     })

//     return res;
// }


// 两个有序数组
function sortedIntersect(nums1, nums2) {
    let p1 = 0, p2 = 0, res = []
    while(p1 < nums1.length || p2 < nums2.length) {
        if (nums1[p1] === nums2[p2]) {
            res.push(nums1[p1])
            p1++;
            p2++;
        } else if(nums1[p1] < nums2[p2]) {
            p1++;
        } else {
            p2++;
        }
    }

    return res;
}
