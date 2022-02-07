/**
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的数字可以无限制重复被选取。

说明：

所有数字（包括 target）都是正整数。
解集不能包含重复的组合。 
示例 1：

输入：candidates = [2,3,6,7], target = 7,
所求解集为：
[
  [7],
  [2,2,3]
]
示例 2：

输入：candidates = [2,3,5], target = 8,
所求解集为：
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
 */

// 回溯法 + 剪枝
// 保证顺序的核心是在深度优先遍历时，屏蔽掉上一轮循环中已经出现的组合
var combinationSum = function(candidates, target) {
    let ans = []
    dfs(candidates, target, 0, [], ans)
    return ans
};

function dfs(candidates, target, begin, path, paths) {
    if (target < 0) return

    if (target === 0) {
        paths.push(path.slice())
        return
    }

    for (let i = begin; i < candidates.length; i++) {
        path.push(candidates[i])
        dfs(candidates, target - candidates[i], i, path, paths)
        path.pop()
    }
}

console.log(combinationSum([2,3,5], 8))