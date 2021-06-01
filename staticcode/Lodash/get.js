const _ = require('lodash');

const obj = { a: { a1: 1 } };
const objA = _.get(obj, 'a');
objA.a1 = 2;

console.log(obj);
