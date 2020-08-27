function promiseAll(requests, nums) {
    let count = 0, taskQueue = [], result = []
    return new Promise((resolve, reject) => {
        if (!requests) {
            return reject('not array')
        }

        for (let i = 0; i < requests.length; i++) {
            if (count >= nums) {
                taskQueue.push(() => {
                    // count++
                    Promise.resolve(requests[i]()).then(v => {
                        result[i] = v
                        // count--
                        if (result.length === requests.length) {
                            resolve(result)
                        } else {
                            if (taskQueue.length) {
                                let task = taskQueue.shift()
                                task()
                            }
                        }
                    })
                })
            } else {
                count++
                Promise.resolve(requests[i]()).then(v => {
                    result[i] = v
                    // count--
                    if (result.length === requests.length) {
                        resolve(result)
                    } else {
                        if (taskQueue.length) {
                            let task = taskQueue.shift()
                            task()
                        }
                    }
                })
            }
        }
    })
}

function ajax(i) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(i)
        }, 1000);
    })
}

let arr = Array.from({length: 100}, (v, i) => () => ajax(i))
// console.log(arr)
console.time('start')
promiseAll(arr, 5).then(v => {
    console.log(v)
    console.timeEnd('start')
})