// 分治法 先拆分到底，再合并两个有序数组
function mergeSort(nums) {
  if (nums.length <= 1) return nums
  const mid = Math.floor(nums.length / 2)
  const left = mergeSort(nums.slice(0, mid))
  const right = mergeSort(nums.slice(mid, nums.length))
  return merge(left, right)
}

function merge(nums1, nums2) {
  let i = 0, j = 0, k = 0
  const res = []
  while(i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      res[k++] = nums1[i++]
    } else {
      res[k++] = nums2[j++]
    }
  }

  while(i < nums1.length) {
    res[k++] = nums1[i++]
  }
  while(j < nums2.length) {
    res[k++] = nums2[j++]
  }

  return res
}

console.log(mergeSort([2,4,1,6,8,0,3,5,7]))
