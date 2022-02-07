function LazyMan(name) {
    return new LazyMan1('Tony')
}

function LazyMan1(name) {
    this.name = name
    this.taskQueue = []
    console.log('Hi I am ', name);
    setTimeout(() => {
        this.next()
    }, 0);
}

LazyMan1.prototype.eat = function(meal) {
    this.taskQueue.push(() =>  {
        console.log('I am eating ', meal)
        this.next()
    })
    return this
}

LazyMan1.prototype.next = function() {
    let task = this.taskQueue.shift()
    task && task()
}

LazyMan1.prototype.sleep = function(time) {
    this.taskQueue.push(() => {
        setTimeout(() => {
            console.log('等待了' + time + '秒...')
            this.next()
        }, time * 1000);
    })
    return this
}

LazyMan1.prototype.sleepFirst = function(time) {
    this.taskQueue.unshift(() => {
        setTimeout(() => {
            console.log('等待了' + time + '秒...')
            this.next()
        }, time * 1000);
    })
    return this
}
// LazyMan('Tony');
// Hi I am Tony

// LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

// LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food