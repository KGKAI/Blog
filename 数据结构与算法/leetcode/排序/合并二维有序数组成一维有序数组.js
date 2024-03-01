function mergeOrder(nums) {
  if (nums.length <= 1) return nums
  return nums.reduce((previous, numArr) => {
    return merge(previous, numArr)
  }, [])
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
const arr= [[1,2,4],[2,3,7],[3,5,7],[4,5,8]]
console.log(mergeOrder(arr))
