function isObjectEqual(obj1, obj2) {
  if (!obj1 || !obj2) return obj1 === obj2
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    const aVal = obj1[key]
    const bVal = obj2[key]
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      if(!isObjectEqual(aVal, bVal)) return false
    } else if (aVal !== bVal){
      return false
    }
  }

  return true
}

const obj1 = {a: 4, b: {c: 2}}
const obj2 = {a: 1, b: {c: 3}}
console.log(isObjectEqual(obj1, obj2))