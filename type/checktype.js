function checkType(param) {
  if (typeof param === "undefined") { return 'undefined' }
  if (!param && typeof param === 'object') { return 'null' }

  // 排除null和undefined后，判断是基本类型还是引用类型
  let isBase = true;
  if (param && (typeof(param) === 'object' || typeof(param) === 'function')) {
    isBase = false;
  }

  if (isBase) {
    return typeof(param);
  } else {
    // toString是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型，
    // 更严格的讲，是 toString运行时this指向的对象类型
    const strName = Object.prototype.toString.call(param);
    return strName.match(/ (\S*)]/)[1]; // 正则表达式截取两个字符串中间部分
  }
}

module.export = ({ checkType }); 


// test
/**
 * 基本数据类型返回全部小写
 * 引用数据类型的返回，首字母大写
 */
const num = 1;
const str = 'str';
const bool = false;
let unde = undefined;
let nu = null;
function func() {}
const arr = [];
const numObj = new Number(1);

console.log(checkType(unde));
console.log(checkType(nu));
console.log(checkType(num));
console.log(checkType(func));
console.log(checkType(arr)); // Array
console.log(checkType(numObj)); // Number
console.log(numObj.valueOf()); // 1