var entry = {
  a: {
    b: {
      c: {
        dd: "abcdd"
      }
    },
    d: {
      xx: "adxx"
    },
    e: "ae"
  }
};

// 要求转换成如下对象
var output = {
  "a.b.c.dd": "abcdd",
  "a.d.xx": "adxx",
  "a.e": "ae"
};

function flatObj(obj, prefix, result = {}) {
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newPrefix = prefix ? (prefix + '.' + key) : key
            if (typeof obj[key] === "object") {
                flatObj(obj[key], newPrefix, result)
            } else {
                result[newPrefix] = obj[key]
            }
        }
    }
}

// let res = {}
// flatObj(entry, '', res)
// console.log(res)

// function convert(obj) {
//     let res = {}
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             let keys = key.split('.')
//             let length = keys.length
//             let target = res
//             for (let i = 0; i < length - 1; i++) {
//                 target[keys[i]] = target[keys[i]] ? target[keys[i]]: {}
//                 target = target[keys[i]]
//             }
//             target[keys[keys.length - 1]] = obj[key]
//         }
//     }

//     return res
// }

// console.log(convert(output))