/**
 * 3. 无重复字符的最长子串
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 */
var lengthOfLongestSubstring = function(s) {
    if (!s) return 0
    let subArr = [s[0]], max = 1
    for (let i = 1; i < s.length; i++) {
        let index = subArr.indexOf(s[i])
        let length = subArr.length;
        if (index != -1) {
            if (index == length - 1) {
                subArr = [s[i]]
            } else {
                subArr = subArr.slice(index + 1, length)
                subArr.push(s[i])
            }
        } else {
            subArr.push(s[i])
        }

        max = Math.max(max, subArr.length)
    }

    return max
};
// 滑动窗口 + object
var lengthOfLongestSubstring = function(s) {
    let left = right = 0, window = {}, ans = 0
    while(right < s.length) {
        let rc = s[right++]
        window[rc] ? window[rc]++ : window[rc] = 1
        while(window[rc] > 1) { // 如果出现了重复
            let lc = s[left++]
            window[lc]--
        }
        ans = Math.max(ans, right - left)
    }    

    return ans
};
// 滑动窗口 + set
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};

console.log(lengthOfLongestSubstring("abccbadefgh"))