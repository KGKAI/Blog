var repeatedSubstringPattern = function(s) {
    let times = 2   // 至少要重复两次,times越小，子串越长
    let len = s.length
    while (times <= len) {
        if (len % times) {
            times++
            continue
        }

        let length = len / times
        if (s.slice(0, length).repeat(times) === s) {   // 某一长度的子串重复times次，如果和s相等，则证明可以，否则继续往后看
            return true
        }
        times++
    }
    return false
};

// var repeatedSubstringPattern = function(s) {
//     let times = 2   // 至少要重复两次,times越小，子串越长
//     let len = s.length, res = []
//     while (times <= len) {
//         if (len % times) {
//             times++
//             continue
//         }

//         let length = len / times
//         if (s.slice(0, length).repeat(times) === s) {   // 某一长度的子串重复times次，如果和s相等，则证明可以，否则继续往后看
//             res.push(s.slice(0, length))
//         }
//         times++
//     }
//     return res
// };

console.log(repeatedSubstringPattern('abcabcabcabc'))

