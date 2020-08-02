var lengthOfLongestSubstring = function(s) {
    if (!s) return 0
    let subArr = [s[0]], max = 1
    for (let i = 1; i < s.length; i++) {
        debugger
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

console.log(lengthOfLongestSubstring("abccbadefgh"))