/**
 * 硬绑定
 * 应用场景：创建一个包裹函数，传入所有的参数并返回接收到的所有值
 */

function foo() {
  console.log(`foo: ${this.a}`);
}
global.a = 3; // node
window.a = 3; // 浏览器

const obj = { a: 2 };
function bar() {
  // 强制将foo的this绑定到obj，对于bar函数的调用方式不会影响foo函数this的指向，
  // 这种显式的强制绑定，成为硬绑定
  foo.call(obj);
  console.log(`bar: ${this.a}`);
}
bar(); // foo: 2 bar: 3
setTimeout(bar, 100); // foo: 2  bar: node环境中是undefined，浏览器中是3
// 硬绑定的bar不可能再修改它的this
bar.call(global); // foo: 2 bar: 3
bar.call(window); // foo: 2 bar: 3
