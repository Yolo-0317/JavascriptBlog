
/**
 *简单的浅拷贝

 拷贝引用和拷贝实例，也就是我们说的浅拷贝和深拷贝
 *
 * @param {*} source
 */
function shallowClone(source) {
  const target = {};
  const keys = Object.keys(source);
  Array.prototype.forEach.call(keys, ((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }));
  return target;
}

const s1 = { a: 3, b: { c: 3 } };
const t1 = shallowClone(s1);
console.log(JSON.stringify(Object.prototype.toString()));
s1.b.d = 'a';
console.log(t1);
