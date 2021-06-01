if (!Number.isInteger) {
  Number.isInteger = function (num) {
    return (typeof num === 'number') && (num % 1 === 0);
  };
}
// eslint-disable-next-line eqeqeq
console.log('1' == 1); // true
// eslint-disable-next-line prefer-template
console.log(typeof ('1' + 1)); // '11'
console.log([1, 2] + [3, 4]); // '1,23,4'

// 手写instanceof
function myInstanceof(left, right) {
  let proto = left.__proto__; // 实例的__proto__
  const protoType = right.prototype; // 构造函数的prototype
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === protoType) {
      return true;
    }
    proto = proto.__proto__;
  }
}

console.log(myInstanceof(1, Number));
