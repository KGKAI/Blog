const taskList = [{
  fn: () => console.log('红灯'),
  time: 3000
}, {
  fn: () => console.log('绿灯'),
  time: 2000,
}, {
  fn: () => console.log('黄灯'),
  time: 1000
}]

const light = (fn, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     fn()
     resolve()
    }, time)
  })
}
async function task() {
  for (let i = 0; i < taskList.length; i++) {
    await light(taskList[i].fn, taskList[i].time)
  }
  await task()
}

task()
