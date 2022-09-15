/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
    // 先排列
    const strs = []
    dfs([], []);
    function dfs(path, visited) {
        if (path.length === words.length) {
            strs.push(path.join(''))
            return;
        }

        for (let i = 0; i < words.length; i++) {
            if (visited.includes(i)) continue;
            path.push(words[i]);
            visited.push(i)
            dfs(path, visited);
            path.pop();
            visited.pop();
        }
    }

    const set = new Set();
    for (const str of strs) {
        let temp = s;
        let lastIndex = 0
        while (temp.indexOf(str, lastIndex) !== -1) {
            const index = temp.indexOf(str, lastIndex);
            set.add(index);
            lastIndex = index + 1
        }
    }
    return [...set]
};

console.log(findSubstring("barfoothefoobarman", ["foo", "bar"]))
// @lc code=end

