// 判断数组合法性
function isValid(arr) {
  return !!(Array.isArray(arr) && arr.length > 0);
}

function unique(arr) {
  const newObj = {};
  const newArr = [];
  const len = arr.length;
  if (isValid(arr)) {
    for (let i = 0; i < len; i += 1) {
      const element = arr[i];
      if (!Object.prototype.hasOwnProperty.call(newObj, element)) {
        newObj[element] = element;
        newArr.push(element);
      }
    }
  }
  return newArr;
}

const arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null,
  null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

console.log('hasOwnProperty', unique(arr)); // [ 1, 'true', 15, false, undefined, null, NaN, 0, 'a', {} ]
