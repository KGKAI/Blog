// 使用全排列的方式，从高位到低位去递归，需要略过000的情况
var printNumbers = function(n) {
    let res = []
    dfs(0, '', n, res)
    return res
};
function dfs(x, path, n, res) {
    if (x === n) {
        if(parseInt(path) !== 0) res.push(parseInt(path))
        return;
    }
    for (let i = 0; i < 10; i++) {
        let newPath = path + i
        dfs(x+1, newPath, n, res)
    }
}

console.log(printNumbers(3))