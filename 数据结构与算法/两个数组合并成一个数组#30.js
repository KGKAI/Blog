//['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']

let arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
let arr2 = ['A', 'B', 'C', 'D']

// let arr3 = new Array(arr1.length+arr2.length)
// let p1 = 0, p2 = 0, p3 = 0
// while(p1 < arr1.length) {
//     let count = 2
//     while(count > 0) {
//         arr3[p3++] = arr1[p1++]
//         count--
//     }
    
//     arr3[p3++] = arr2[p2++]
// }
// console.log(arr3)
arr2.map((item,index)=>{
    arr1.splice((index+1)*2+index,0,item)
})
console.log(arr1)
