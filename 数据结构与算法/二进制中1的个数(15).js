// n和n-1做与运算，每次都会讲最后一位1置位0
var hammingWeight = function(n) {
    let count = 0
    while(n) {
        count++
        n = n & (n-1)
    }

    return count
};