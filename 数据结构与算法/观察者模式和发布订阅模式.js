// 观察者模式
class Subject {
    observers = [];
    add(observer) {
        this.observers.push(observer)
    }

    notify(...args) {
        this.observers.forEach(cb => cb.update(...args))
    }
}

class Observer {
    update(...args) {
        console.log(...args)
    }
}

let o1 = new Observer()
let o2 = new Observer()
let o3 = new Observer()

let s = new Subject()
s.add(o1)
s.add(o2)
s.add(o3)

s.notify('Hello, my name is kevin')

// 发布订阅模式
class PubSub {
    constructor() {
        this.subscribers = []
    }

    subscribe(topic, callback) {
        let callbacks = this.subscribers[topic]
        if (!callbacks) {
            this.subscribers[topic] = [callback]
        } else {
            callbacks.push(callback)
        }
    }

    publish(topic, ...args) {
        let callbacks = this.subscribers[topic]
        callbacks.forEach(cb => cb(...args))
    }
}

let pb = new PubSub()
pb.subscribe('SMS', console.log)
pb.subscribe('SMS', args => console.log(args.padStart(10, 0)))

pb.publish("SMS", "hello")