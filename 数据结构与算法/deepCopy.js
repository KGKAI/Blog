
// let obj = {a: 1, inside: {b: 2}, c: [1, 2, 3]}
// let = newObj = deepCopy(obj)
// obj.inside.b = 3
// console.log(obj)
// console.log(newObj)

// function deepCopyBFS(origin) {      // 广度优先
//     let target = Array.isArray(origin) ? [] : {}
//     let queue = [[origin, target]];

//     while(queue.length) {
//         let [ori, tar] = queue.shift();
//         Object.keys(ori).forEach(key => {
//             let value = ori[key];
//             if (ori.hasOwnProperty(key)) {
//                 if (typeof value === "object") {
//                     tar[key] = Array.isArray(value) ? [] : {}
//                     queue.push([value, tar[key]]);
//                 } else {
//                     tar[key] = value;
//                 }
//             }
//         })
//     }

//     return target;
// }

function deepCopyBFS(origin) {      // 层序深拷贝
    if (typeof origin !== "object") return origin
    
    let target = Array.isArray(origin) ? [] : {}
    let map = new Map()
    map.set(origin, target)
    let queue = [[origin, target]];

    while(queue.length) {
        let [ori, tar] = queue.shift();
        Object.keys(ori).forEach(key => {
            let value = ori[key];
            if (ori.hasOwnProperty(key)) {
                if (map.get(value)) {
                    tar[key] = map.get(value);
                } else {
                    if (typeof value === "object") {
                        tar[key] = Array.isArray(value) ? [] : {}
                        queue.push([ori[key], tar[key]]);
                        map.set(ori[key], tar[key])
                    } else {
                        tar[key] = value;
                    }
                }
            }
        });
    }

    return target;
}

let obj = {a: 1, inside: {b: 2}, c: [1, 2, 3]}
obj.d = obj
obj.inside.f = obj
// let newObj = deepCopyBFS(obj)
// console.log(newObj)

// let newObj2 = deepCopyBFS([1, 2, [3, 4], [5, [6, [7, 8]]]])
// console.log(newObj2)

function getEmpty(o){
	if(Object.prototype.toString.call(o) === '[object Object]'){
		return {};
	}
	if(Object.prototype.toString.call(o) === '[object Array]'){
		return [];
	}
	return o;
}

function deepCopyDFS(origin){
	let stack = [];
	let map = new Map(); // 记录出现过的对象，用于处理环

	let target = getEmpty(origin);
	if(target !== origin){
		stack.push([origin, target]);
		map.set(origin, target);
	}

	while(stack.length){
		let [ori, tar] = stack.pop();
		for(let key in ori){
			// 处理环状
			if(map.get(ori[key])){
				tar[key] = map.get(ori[key]);
				continue;
			}

			tar[key] = getEmpty(ori[key]);
			if(tar[key] !== ori[key]){
				stack.push([ori[key], tar[key]]);
				map.set(ori[key], tar[key]);
			}
		}
	}

	return target;
}


let newObj = deepCopyDFS(obj)
console.log(newObj)