/**
 * 函数柯里化
 * 在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
 * 所谓柯里化就是把具有较多参数的函数转换成具有较少参数的函数的过程。
 * curry 的概念很简单：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。
 */

const { curry } = require('lodash');

const match = curry((what, str) => str.match(what));

const replace = curry((what, replacement, str) => str.replace(what, replacement));

const filter = curry((f, ary) => ary.filter(f));

const map = curry((f, ary) => ary.map(f));

console.log(match(/\s+/g, 'hello world')); // [ ' ' ])

const add = function (x) {
  return function (y) {
    return x + y;
  };
};

const increment = add(1);
const addTen = add(10);

console.log(increment(2));
console.log(addTen(2));

const addCurried = curry(add);
console.log(addCurried(1)(2));
console.log(addCurried(10)(2));
