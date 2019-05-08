const a = 42;
const b = 'abc';
const c = null;
console.log(a || b); // 42
console.log(a && b);// "abc"
console.log(c || b);// "abc"
console.log(c && b);// null
console.log(c && b);// null
console.log(!!(c && b));// false
