// 在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。
//例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

function sortBalls(arr) {
    if (!arr || !arr.length) return arr
    let map = new Map()
    map.set('黄', 1).set('红', 2).set('蓝', 3);
    arr.sort((b1, b2) => map.get(b1) - map.get(b2))
    return arr
}

console.log(sortBalls(['红','蓝','蓝','黄','红','黄','蓝','红','红','黄','红']))