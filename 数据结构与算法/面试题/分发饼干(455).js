var findContentChildren = function(g, s) {
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    let i = 0, j = 0, count = 0
    while(i < g.length && j < s.length) {
        if (g[i] <= s[j]) {
            count++
            i++
            j++
        } else {
            j++
        }
    }

    return count
};

console.log(findContentChildren([10,9,8,7], [5,6,7,8]))