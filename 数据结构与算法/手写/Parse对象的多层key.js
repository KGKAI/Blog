function parse(obj, str) {
  str = str.replace(/\[(\d+)\]/g, '.$1')
  const arr = str.split('.')
  arr.forEach((key) => obj = obj[key])
  return obj
}

let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, 'a');
let r2 = parse(obj, 'b.c');
let r3 = parse(obj, 'd[2]');
let r4 = parse(obj, 'e[0].f[0]');
console.log(r1, r2, r3, r4)
