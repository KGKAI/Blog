const list = [{id: 1}, {id:2, pId: 1}, {id: 3, pId: 2}, {id: 4}, {id:3, pId: 2}, {id: 5, pId: 4}];

function transform(arr) {
  if (!arr || !arr.length) return null
  const res = []
  const map = new Map() // key: id, value: children
  arr.forEach((item) => map.set(item.id, item))
  for (const item of map.values()) {
    if (!item.pId) {
      res.push(item)
    } else {
      const parent = map.get(item.pId)
      if (parent.children) {
        parent.children.push(item)
      } else {
        parent.children = [item]
      }
    }
  }

  return res
}

console.log(transform(list))
