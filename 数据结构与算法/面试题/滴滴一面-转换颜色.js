// 实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF'

// function transform(str) {
//     const nums = str.split(',')
//     console.log(nums)
//     nums[0] = +nums[0].slice(4)
//     nums[1] = +nums[1]
//     nums[2] = +nums[2].slice(0, 4)
//     let res = '#'
//     const map = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}
//     for (let i = 0; i < nums.length; i++) {
//         let num = nums[i];
//         while (num) {
//             const mod = num % 16;
//             res += map[mod];
//             num = Math.floor(num / 16);
//         }
//     }
//
//     return res;
// }

// 1、先取十进制数字
// 2、十进制转十六进制 除以16， 取余数
// 3、注意余数倒排
function transform(str) {
    const reg = /^rgb\((\d*),\s*(\d*),\s*(\d*)\)/
    const nums = str.match(reg).slice(1)
    console.log(nums)
    let res = '#'
    const map = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}
    for (let i = 0; i < nums.length; i++) {
        let num = +nums[i];
        // 注意余数的顺序是从后往前
        let temp = ''
        while (num) {
            const mod = num % 16;
            temp = map[mod] + temp;
            num = Math.floor(num / 16);
        }
        res += temp;
    }

    return res;
}

console.log(transform('rgb(221, 163, 25))'))

