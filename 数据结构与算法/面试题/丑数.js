var nthUglyNumber = function(n) {
    let number = 1;
    while(n) {
        if (isUgly(number)) {
            n--
        }
        number++
    }
    return number - 1
};

function isUgly(n) {
    while (n != 1) {
        if (n % 2 === 0) {
            n = n / 2
        } else if (n % 3 === 0) {
            n = n / 3
        } else if (n % 5 === 0){
            n = n / 5
        } else {
            break
        }
    }

    return n === 1
}
console.log(nthUglyNumber(1500))