// 标题
// 并发请求限制

// 题目描述
// 【背景】​
// 一般浏览器会限制并发请求数，微信小程序之前也限制过最多请求不超过10个。​
// 现在，让我们来实现一下这个功能。​
// 【问题描述】​
// 实现这样一个函数scheduler，函数入参为并发最大次数。​
// 如下最终输出顺序： 2、3、 1、 4​
// 一开始，1、2两个任务进入队列​
// 500ms时，2完成，输出2，任务3进队​
// 800ms时，3完成，输出3，任务4进队​
// 1000ms时，1完成，输出1​
// 1200ms时，4完成，输出4​

// // -----------------mock一些请求​
const request1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
}

const request2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2);
        }, 500);
    });
}
const request3 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 300);
    });
}
const request4 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(4);
        }, 400);
    })
};
// // -----------------最多并发2个请求​
// function scheduler(max) {​
//   // ------你的代码​
// }​

const addRequest = scheduler(2);
addRequest(request1).then(res => {
    console.log(res);
});
addRequest(request2).then(res => {
    console.log(res);
});
addRequest(request3).then(res => {
    console.log(res);
});
addRequest(request4).then(res => {
    console.log(res);
});


function scheduler(max) {
    const queue = [];
    let count = 0;
    return function addRequest(request) {
        return new Promise((resolve, reject) => {
            queue.push(() => request().then(resolve, reject));
            run();
        })
    }

    function run() {
        if (count < max && queue.length) {
            const cb = queue.shift();
            count++;
            cb().then(() => {
                count--;
                run();
            })
        }
    }
}