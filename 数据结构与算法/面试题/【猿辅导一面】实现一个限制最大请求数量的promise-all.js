// function promiseAll(requests, nums) {
//     let count = 0, taskQueue = [], result = []
//     return new Promise((resolve, reject) => {
//         if (!requests) {
//             return reject('not array')
//         }

//         for (let i = 0; i < requests.length; i++) {
//             if (count >= nums) {
//                 taskQueue.push(() => {
//                     // count++
//                     Promise.resolve(requests[i]()).then(v => {
//                         result[i] = v
//                         // count--
//                         if (result.length === requests.length) {
//                             resolve(result)
//                         } else {
//                             if (taskQueue.length) {
//                                 let task = taskQueue.shift()
//                                 task()
//                             }
//                         }
//                     })
//                 })
//             } else {
//                 count++
//                 Promise.resolve(requests[i]()).then(v => {
//                     result[i] = v
//                     // count--
//                     if (result.length === requests.length) {
//                         resolve(result)
//                     } else {
//                         if (taskQueue.length) {
//                             let task = taskQueue.shift()
//                             task()
//                         }
//                     }
//                 })
//             }
//         }
//     })
// }

function promiseAll(promises, max) {
    let count = 0, queue = [], result = [];
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject('not array')
        }
        for (let i = 0; i < promises.length; i++) {
            queue.push(() => promises[i]().then(value => {
                console.log(value)
                result[i] = value;
                if (result.length === promises.length) {
                    resolve(result)
                }
                count--;
                run();
            }, reject));
        }
        run();
    });

    function run() {
        while (count < max && queue.length) {
            const cb = queue.shift()
            count++;
            cb();
        }
    }
}

function ajax(i) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(i)
        }, 1000);
    })
}

let arr = Array.from({ length: 100 }, (v, i) => () => ajax(i))
// console.log(arr)
console.time('start')
promiseAll(arr, 5).then(v => {
    console.log(v)
    console.timeEnd('start')
})