/**
 * 优先级
 * new绑定和隐式绑定的优先级
 */

function foo(something) {
  this.a = something;
}
const obj1 = { foo };
const obj2 = {};

obj1.foo(2); // 此时foo的this指向obj1，所以foo执行时，this.a=2相当于执行了obj1.a=2
console.log(obj1.a);// 2

obj1.foo.call(obj2, 3); // 此时foo的this指向obj2，所以foo执行时，this.a=2相当于执行了obj1.a=2
console.log(obj2.a);// 3

const bar = new obj1.foo(4);
console.log(obj1.a);// 2
console.log(bar.a);// 4
