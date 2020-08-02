function convert(target, radix) {
    let res = []
    while(target) {
        let temp = target % radix;
        res.unshift(temp);
        target = Math.floor(target / radix)
    }

    return res.join("")
}

console.log(convert(10, 16))