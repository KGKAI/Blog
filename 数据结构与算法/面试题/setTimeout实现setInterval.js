function myInterval(callback, time) {
    let timer;
    _interval();
    function _interval() {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            callback();
            _interval();
        }, time);
    }

    return function () {
        timer && clearTimeout(timer)
    }
}

let clear = myInterval(() => console.log(Math.random()), 1000)