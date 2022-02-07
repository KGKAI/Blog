// 排序 + 双指针
function threeSum(nums) {
    let res = []
    let n = nums.length
    nums.sort((a, b) => a - b)
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) return res

        if (i > 0 && nums[i] === nums[i - 1]) continue  // 从第二个元素开始比较，去除重复元素
        let l = i + 1, r = n - 1
        while (l < r) {
            if (nums[i] + nums[l] + nums[r] === 0) {
                res.push([nums[i], nums[l], nums[r]])
                while(l < r && nums[l] === nums[l+1]) l++
                while(l < r && nums[r] === nums[r-1]) r--
                l++
                n--
            } else if (nums[i] + nums[l] + nums[r] < 0) {
                l++
            } else {
                r--
            }
        }
    }

    return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))

// https://leetcode-cn.com/problems/3sum/solution/pai-xu-shuang-zhi-zhen-zhu-xing-jie-shi-python3-by/