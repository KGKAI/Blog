let obj = {
  a: 1,
  b: {
    c:2
  },
  d: [1,2,3],
  e:{
    f: {
      g:5
    }
  }
}

function search(obj, value) {
  function dfs(obj, value) {
    if (!obj) {
      return []
    }
    for (const key in obj) {
      if (obj[key] === value) {
        return [key]
      }
      if (obj[key] && typeof obj[key] === 'object') {
        const childResult = dfs(obj[key], value)
        if (childResult.length > 0) {
          return key.concat(...childResult)
        }
      }
    }
    return []
  }
  return dfs(obj, value)
}

console.log(search(obj, 4))