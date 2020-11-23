/**
 * 给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。
 * 示例：
    输入：S = "ADOBECODEBANC", T = "ABC"
    输出："BANC"
 */

// 1. 使用滑动窗口算法，left=right=0，[left,right]为窗口
// 2. 先不断增加right扩大窗口，直到窗口中的字符串符合要求
// 3. 停止增加right，转而增加left缩小窗口大小，直到窗口中的字符不再满足要求。该过程中不断修改结果
// 4. 重复2、3步，直到right到达尽头
var minWindow = function(s, t) {
    let left = right = 0, match = 0, keyLen = 0, start = 0, minLen = s.length + 1
    let needs = {}, window = {}
    // 记录t中每个字符出现的次数
    for(let i = 0; i < t.length; i++) {
        if (needs[t[i]]) {
            needs[t[i]]++
        } else {
            needs[t[i]] = 1
            keyLen++
        }
    }

    while(right < s.length) {
        let char = s[right++]
        window[char] ? window[char]++ : window[char] = 1
        if (window[char] === needs[char]) match++
        while(match === keyLen) { // 找到一个符合条件的, 记录开始位置和最小长度
            if (right - left < minLen) {
                start = left
                minLen = right - left
            }
            // left右移，缩小窗口
            let lC = s[left++]
            if (window[lC] === needs[lC]) match--   // 如果左侧字符能够匹配需要的字符串，那么匹配的数量需要-1
            window[lC]--
        }
    }
    return minLen === s.length + 1 ? "" : s.substr(start, minLen)
};

