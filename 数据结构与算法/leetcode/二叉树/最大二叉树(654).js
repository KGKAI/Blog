/**
 * 给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

二叉树的根是数组中的最大元素。
左子树是通过数组中最大值左边部分构造出的最大二叉树。
右子树是通过数组中最大值右边部分构造出的最大二叉树。
通过给定的数组构建最大二叉树，并且输出这个树的根节点。

 

示例 ：

输入：[3,2,1,6,0,5]
输出：返回下面这棵树的根节点：

      6
    /   \
   3     5
    \    / 
     2  0   
       \
        1
 

提示：

给定的数组的大小在 [1, 1000] 之间。
 */

 // 不要纠结于递归的细节，只需要找出当前根节点的定义!
 var constructMaximumBinaryTree = function(nums) {
     return build(nums, 0, nums.length - 1)
 }

 function build(nums, lo, hi) {
    if (lo > hi) return null

    // 1.找出数组在当前区间的最大值
    let index = lo, max = nums[lo]
    for (let i = lo + 1; i <= hi; i++) {
        if (nums[i] > max) {
            index = i
            max = nums[i]
        }
    }

    // 2. 构造根节点，并运用先序遍历的思想，递归地去构建左子树和右子树
    let root = new TreeNode(max)
    root.left = build(nums, lo, index - 1)
    root.right = build(nums, index + 1, hi)
    
    return root
 }
