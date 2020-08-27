function output(arr) {
    if (!arr) return []
    if (arr.length === 1) return [arr[0] + '']

    debugger
    let subArr = [arr[0]], length = arr.length, res = []
    for (let i = 1; i <= length; i++) {
        let lastMax = subArr[subArr.length - 1]
        if (arr[i] === lastMax + 1) {
            subArr.push(arr[i])
        } else {
            let temp;
            if (subArr.length === 1) {
                temp = subArr[0] + ''
            } else {
                temp = `${subArr[0]}->${subArr[subArr.length - 1]}`
            }
            res.push(temp)
            subArr = [arr[i]]
        }
    }

    return res
}

let arr = [1, 2, 3, 4, 6, 7, 9, 13, 14, 15, 18]
console.log(output(arr))
