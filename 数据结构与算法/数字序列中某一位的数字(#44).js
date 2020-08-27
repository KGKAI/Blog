var findNthDigit = function(n) {
    let start = 1, digit = 1
    while(n > (9 * start * digit)) {
        n = n - 9 * start * digit
        start = start * 10
        digit++
    }

    let count = parseInt(n / digit)
    let rem = n % digit
    let num = rem ? start + count : start + count - 1
    let res
    if (!rem) {
        let temp = num + ''
        res = parseInt(temp[temp.length - 1])
    } else {
        let temp = num + ''
        res = parseInt(temp[rem - 1])
    }
    return res
};

console.log(findNthDigit(298))

