// 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，
// 将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。
function sortArray(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        let index = parseInt(arr[i] / 10)
        if (!res[index]) {
            res[index] = [arr[i]]
        } else {
            if (res[index].indexOf(arr[i]) == -1) {
                res[index].push(arr[i])
            }
        }
    }

    return res
}
let arr = [2, 10, 3, 4, 5, 11, 10, 11, 20]
console.log(sortArray(arr))