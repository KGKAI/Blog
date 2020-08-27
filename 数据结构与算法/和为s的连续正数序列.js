function findContinuousSequence(target) {
    debugger
    let i = 1, j = 1, sum = 0, res = []
    while(i <= parseInt(target / 2)) {
        if (sum < target) {
            sum += j
            j++
        } else if (sum > target) {
            sum -= i
            i++
        } else {
            let temp = []
            let k = i
            while(k < j) {
                temp.push(k++)
            }

            res.push(temp)
            sum -= i
            i++
        }
    }
    return res
}

console.log(findContinuousSequence(15))