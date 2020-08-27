var countDigitOne = function(n) {
    debugger
    let cur = n % 10, low = 0, high = Math.floor(n / 10), digit = 1, number = 0
    while (high != 0 || cur != 0) {
        if (cur === 0) {
            number += high * digit
        } else if (cur === 1) {
            number += high * digit + low + 1
        } else {
            number += (high + 1) * digit
        }
        low += cur * digit
        cur = high % 10
        high = Math.floor(high / 10)
        digit = digit * 10
    }

    return number
};

console.log(countDigitOne(12))