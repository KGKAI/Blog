// 使用二分查找，mid与最右边元素比较
// 如果nums[mid] < nums[r]，说明最小值<= nums[mid],足以此时舍弃右边部分，r = mid
// 如果nums[mid] > nums[r],说明最小值在[mid + 1, r],此时l = mid + 1
// 如果nums[mid] == nums[r]，不能判断最小值是在左区间还是右区间，此时令r = r - 1向右逼近
var minArray = function(numbers) {
    let l = 0, r = numbers.length - 1
    while(l <= r) {
        let mid = parseInt((l + r) / 2)
        if (numbers[mid] < numbers[r]) {
            r = mid
        } else if (numbers[mid] > numbers[r]) {
            l = mid + 1
        } else {
            r = r - 1
        }
    }
    return numbers[l]
};

console.log(minArray([3,1,1]))