class Scheduler {
    queue = []
    count = 0
    constructor(max) {
        this.max = max
    }
    add(request) {
        return new Promise((resolve, reject) => {
            this.queue.push(() => request().then(resolve, reject));
            this.run();
        })
    }

    run() {
        if (this.count < this.max && this.queue.length) {
            const request = this.queue.shift();
            this.count++;
            request().then(() => {
                this.count--;
                this.run();
            })
        }
    }
}

// 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个。完善下面代码中的 Scheduler 类，使得以下程序能正确输出。
const timeout = timer => new Promise(resolve => setTimeout(resolve, timer));
const scheduler = new Scheduler(2);
const addTask = (time, order) => {
    scheduler.add(() => timeout(time)).then(() => {
        console.log(order);
    });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");