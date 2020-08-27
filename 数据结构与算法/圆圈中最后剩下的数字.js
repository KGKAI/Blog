var lastRemaining = function(n, m) {
    let arr = Array.from({length : n}, (item, i) => i), index = 0
    debugger
    while (arr.length > 1) {
        let length = arr.length
        index = (index + m - 1) % length
        arr.splice(index, 1)
    }

    return arr[0]
};

console.log(lastRemaining(5, 3))