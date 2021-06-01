// "use strict";

/** 
 * 原型链 
 * hasOwnProperty()检测一个属性是存在与实例中，还是存在与原型中
 * Object.create方法创建一个对象，并把新对象的[[Prototype]]关联到指定对象
 * 
 * 所有普通的[[Prototype]]最终都会指向Object.protoType属性
 * */

const obj = {a: 2};

Object.defineProperty(obj, 'birth', {
  writable: false,
  value: 1995
});

const obj1 = Object.create(obj); // 与obj关联,创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
const obj2 = obj;

obj1.birth = 1991; // birth的writable为false，所以严格模式下报错，非严格模式忽略
obj2.a = 'obj2';
console.log(`不会发生属性屏蔽: ${obj1.birth}`); // 不会发生属性屏蔽，输出1995
console.log(`属性屏蔽： ${obj2.a}`); // obj2
console.log(`obj: ${JSON.stringify(obj)}, obj1: ${JSON.stringify(obj1)}; obj2: ${JSON.stringify(obj2)}`)
console.log(`obj1 has a : ${obj1.hasOwnProperty('a')}`);
console.log(`obj1 has birth : ${obj1.hasOwnProperty('birth')}`);
console.log(`obj2 has a : ${obj2.hasOwnProperty('a')}`);
console.log(`obj2 has birth : ${obj2.hasOwnProperty('birth')}`);

console.log(`${obj1.__proto__ === obj.__proto__}`); // false
console.log(`${obj1.__proto__ === obj}`); // true

// 使用for...in遍历对象的原理类似查找[[PrototType]]链，任何可以通过原型链访问到的属性都可以被枚举
// 所以obj1虽然没有属性a，但是可以枚举得到
for (let key in obj1) {
  console.log(`key: ${key}`); // key: a
}