/**
 * 1、处理不同类型 对象、数组、内置对象、symbol等
 * 2、处理循环引用
 *
 * https://cloud.tencent.com/developer/article/1497418
 */

function deepCopy(target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }

  if (map.has(target)) {
    return map.get(target)
  }

  let cloneObj
  const tag = getTag(target)
  if ([arrayTag, objectTag, mapTag, setTag].includes(tag)) { // 需要深拷贝
    cloneObj = initObj(target)
  } else {
    return cloneOtherTag(target, tag)
  }
  map.set(target, cloneObj)

  if (tag === mapTag) {
    target.forEach((v, k) => cloneObj.set(k, deepCopy(v, map)))
    return cloneObj
  }
  if (tag === setTag) {
    target.forEach((v) => cloneObj.add(v))
  }

  copySymbolsIn(target, cloneObj)
  arrayEach(tag === arrayTag ? target : Object.keys(target), (v, k) => {
    if (tag === objectTag) {
      k = v
    }
    cloneObj[k] = deepCopy(target[k], map)
  })

  return cloneObj
}

function isObject(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function')
}

function arrayEach(array, iterate) {
  let index = -1
  while(++index < array.length) {
    iterate(array[index], index)
  }
  return array
}

function getTag(value) {
  return Object.prototype.toString.call(value)
}
function initObj(value) {
  const constructor = value.constructor
  return new constructor()
}

function cloneOtherTag(value, tag) {
  const Constructor = value.constructor
  switch(tag) {
    case boolTag:
    case numberTag:
    case stringTag:
    case dateTag:
    case errorTag:
      return new Constructor(value)
    case symbolTag:
      return cloneSymbol(value)
    default:
      return null
  }
}

function cloneSymbol(value) {
  return Object(Symbol.prototype.valueOf.call(value))
}

function copySymbolsIn(value, cloned) {
  const symbols = Object.getOwnPropertySymbols(value)
  if (symbols.length) {
    symbols.forEach((symbol) => cloned[symbol] = value[symbol])
  }
}

const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const mapTag = '[object Map]'
const setTag = '[object Set]'

const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const dateTag = '[object Date]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'

const obj = {
  a: 1,
  b: new Date(),
  c: new String('c'),
  [Symbol('d')]: 'd',
  e: Symbol('e'),
}
obj.f = obj

const cloned = deepCopy(obj)
console.log(cloned)
