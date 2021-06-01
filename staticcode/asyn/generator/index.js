
/**
 * generator函数
 *  可暂停函数, yield 可暂停，next 方法可启动，每次返回的是 yield 后的表达式结果。
 *  yield 表达式本身没有返回值，或者说总是返回 undefined
 *  next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值。
 * @param {*} x
 * @returns
 */
function* foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}