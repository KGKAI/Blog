// 找规律 1-9中有9位 9 * 1 * 1
//       10-99中有180位  9 * 10 * 2
//       100-999中有2700位  9 * 100 * 3
// 1. 用n依次减去i位数的数位的个数，直到n <= i位数的数位个数
// 2. 找到n落位在i位数的第几个数字
// 3. 返回这个数字中的位数
var findNthDigit = function(n) {
    let start = 1, digit = 1
    while(n > (9 * start * digit)) {
        n = n - 9 * start * digit
        start = start * 10
        digit++
    }

    let num = parseInt(start + (n - 1) / digit) + ''
    return num[(n - 1) % digit] - '0'
};

console.log(findNthDigit(300))

