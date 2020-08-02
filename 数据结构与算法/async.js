// async function() {}     function fn() {return spawn(function* () {})}
// 相当于一个generator自执行器 + Promise

function spawn(genF) {
    return new Promise((resolve, reject) => {
        let g = genF();
        function step(nextF) {
            let next;
            try {
                next = nextF()
            } catch(e) {
                return reject(e)
            }

            if (next.done) return resolve(next.value)

            Promise.resolve(next.value).then(v => step(function() {gen.next(v)}), r => step(function() {gen.throw(r)}))
        }
    
        step(function() {g.next(undefined)})
    })
}
