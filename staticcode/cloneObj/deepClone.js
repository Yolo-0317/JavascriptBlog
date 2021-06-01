/**
 * 深拷贝
 * 拷贝的是source的实例，而不是引用
*/

const _ = require('../Lodash');

function deepClone(source) {
  if (source === null) {return null}//对入参进行校验
  const target = _.isArray(source) ? [] : {}; // 增加对数组的支持
  const keys = Object.keys(source);
  Array.prototype.forEach.call(keys, ((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (_.isObject(source[key])) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }));
  return target;
}

const s1 = { a: 3, b: { c: 3 } };
const t1 = deepClone(s1);
console.log(JSON.stringify(Object.prototype.toString()));
s1.b.d = 'a';
console.log(t1); // 因为深拷贝拷贝的是s1的实例，所以改变s1并不会影响t1

const a1 = [1, { b: { c: 3 } }];
const t2 = deepClone(a1);
a1[1].d = 9;
console.log(t2, a1);
