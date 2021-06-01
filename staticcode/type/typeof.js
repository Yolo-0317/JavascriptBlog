const num = 1;
const str = 'str';
const bool = false;
let unde = undefined;
let nu = null;

console.log(typeof num); // number
console.log(typeof str); // string
console.log(typeof bool); // boolean
console.log(typeof unde); // undefined
console.log(typeof nu); // object


// typeof不适用于引用类型的检测
const obj = {};
console.log(typeof obj); // object
const arr = [];
console.log(typeof arr); // object
function func() {}
console.log(typeof func); // function

// instanceof 不适用于基本数据类型检测
console.log(num instanceof Number); // false
console.log(obj instanceof Object); // true

// 对于数组的检测
console.log(arr instanceof Object); // true
console.log(arr instanceof Array); // true
