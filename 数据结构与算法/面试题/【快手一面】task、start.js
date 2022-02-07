function Queue() {
    this.tasks = []
}

Queue.prototype.task = function(timeout, cb) {
    this.tasks.push(() => {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
             cb()
             resolve()
        }, timeout)                   
        })   
    }); 
    return this
}

Queue.prototype.start = function() {
    let self = this
    function _start() {
        if (self.tasks.length > 0) {
            let cb = self.tasks.shift()
            Promise.resolve(cb()).then(() => {
                _start()                           
            })
        }
    }
    _start()
}

new Queue().task(1000,()=>console.log(1)).task(3000,()=>console.log(2)).task(2000,()=>console.log(3)).start()