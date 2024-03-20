const strList = '红蓝蓝黄红黄蓝红红黄红'

const sort = (str) => {
  const orderMap = {
    '黄': 1,
    '红': 2,
    '蓝': 3
  }
  return str.split('').sort((a, b) => orderMap[a] - orderMap[b])
}

console.log(sort(strList))
