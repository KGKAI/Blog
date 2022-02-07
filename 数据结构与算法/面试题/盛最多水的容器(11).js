/**
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
 * 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

    说明：你不能倾斜容器，且 n 的值至少为 2。
    示例：

    输入：[1,8,6,2,5,4,8,3,7]
    输出：49
 */

/**
 * 双指针法：双指针代表的是可以作为容器边界的所有位置的范围
 * 设左侧边界值为x，右侧边界值为y,x<=y, 两个指针之间的距离为t
 * 盛水的面积计算公式为 area = min(x, y) * t = x * t
 * 如果我们保持左指针的位置不变，那么无论右指针在哪里，这个容器的容量都不会超过x*t
 * 即对应的数字较小的指针不可能再作为容器的边界了，所以需要将对应数字较小的指针向另一个指针的方向移动
 */
var maxArea = function(height) {
    if (!height || !height.length) return 0
    let l = 0, r = height.length - 1, ans = 0
    while(l < r) {
        let area = Math.min(height[l], height[r]) * (r - l)
        ans = Math.max(ans, area)
        if (height[l] <= height[r]) {
            l++
        } else {
            r--
        }
    }

    return ans
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]))