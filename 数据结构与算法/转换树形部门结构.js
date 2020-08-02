// function convert(source){
//     let result = []
//     let map = {}
//     source.forEach(element => {
//         map[element.id] = element
//     });

//     source.forEach(element => {
//         if (element.parentId == 0) {
//             result.push(element)
//         } else {
//             map[element.parentId]['children'] ? map[element.parentId]['children'].push(element) : map[element.parentId]['children'] = [element]
//         }
//     })

//     return result
//   }

// let list =[
//     {id:1,name:'部门A',parentId:0},
//     {id:2,name:'部门B',parentId:0},
//     {id:3,name:'部门C',parentId:1},
//     {id:4,name:'部门D',parentId:1},
//     {id:5,name:'部门E',parentId:2},
//     {id:6,name:'部门F',parentId:3},
//     {id:7,name:'部门G',parentId:2},
//     {id:8,name:'部门H',parentId:4}
// ];

// const result = convert(list);
// console.log(result)


const list = [{
    id: '1',
    name: '广东省',
    children: [{
      id: '11',
      name: '深圳市',
      children: [{
          id: '111',
          name: '南山区'
        },
        {
          id: '112',
          name: '福田区'
        }
      ]
    }]
  }]

// const value = '112'
// const bfs = (value, list) => {
//     let queue = [...list], res = [], level = 0
//     while(queue.length) {
//         debugger
//         let length = queue.length
//         for (let i = 0; i < length; i++) {
//             let node = queue.shift()
//             if (node.id === value) {
//                 res.push(node.id)
//             } else {
//                 if (value.slice(0, level + 1) === node.id) {
//                     res.push(node.id)
//                 }
//                 node.children && queue.push(...node.children)
//             }
//         }
//         level++
//     }

//     return res
// }
// console.log(bfs(value, list))

const dfs = (value, list) => {
    let res = []
    function _dfs(value, list, res) {
        if (!list) return
        let length = list.length
        for (let i = 0; i < length; i++) {
            let target = list[i]
            if (target.id === value) {
                res.push(target.id)
            } else {
                if (value.startsWith(target.id)) {
                    res.push(target.id)
                    _dfs(value, target.children, res)
                }
            }
        }
    }
    _dfs(value, list, res)
    
    return res
}

const value = '112'
console.log(dfs(value, list))