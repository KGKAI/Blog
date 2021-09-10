/**
 * 快慢指针
 * 我们让慢指针slow走在后面，快指针fast走在前面探路，找到一个不重复的元素就告诉slow并让slow前进一步。这样当fast指针遍历完整个数组nums后，nums[0..slow]就是不重复元素。
 */
var removeDuplicates = function(nums) {
    let slow = 0
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[slow] !== nums[fast]) {
            nums[++slow] = nums[fast]
        }
    }

    return slow + 1
};

console.log(removeDuplicates([0,0,1,1,1,2,2,3,3,4]))