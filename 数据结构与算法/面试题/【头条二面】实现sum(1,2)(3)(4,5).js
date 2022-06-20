function sum() {
    let total = 0;
    [...arguments].forEach(arg => {
        total += arg
    })

    let sum1 = function() {
        [...arguments].forEach(arg => {
            total += arg
        })
        return sum1
    }
    sum1.toString = function() {
        return total
    }
    return sum1
}

sum(1)(2,3,4)(5,6)

