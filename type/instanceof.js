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
