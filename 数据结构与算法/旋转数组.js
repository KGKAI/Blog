function move(arr, k) {
    if (!arr || !arr.length) return arr
    while(k) {
        let temp = arr.pop()
        arr.unshift(temp)
        k--
    }

    return arr
}

console.log(move([-1, -100, 3, 99], 2))