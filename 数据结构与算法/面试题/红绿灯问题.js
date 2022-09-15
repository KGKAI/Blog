// 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯
function red() {
    console.log('red');
}
function green() {
    console.log('green');
}
function yellow() {
    console.log('yellow');
}

const taskList = [
    {
        fn: red,
        time: 3000
    },
    {
        fn: green,
        time: 1000
    },
    {
        fn: yellow,
        time: 2000
    }
]

function light(cb, time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cb()
            resolve()
        }, time);
    })
}

async function step() {
    for (let i = 0; i < taskList.length; i++) {
        const { fn, time } = taskList[i]
        await light(fn, time)
    }

    step();
}
step();