// 判断数组合法性
function isValid(arr) {
  return !!(Array.isArray(arr) && arr.length > 0);
}

function unique(arr) {
  if (isValid(arr)) {
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
      for (let j = i + 1; j < len; j += 1) {
        if (arr[i] === arr[j]) {
          // 第一个等同于第二个，splice方法删除第二个
          arr.splice(j, 1);
        }
      }
    }
    return arr;
  }
  return [];
}

// indexof
function unique1(arr) {
  const newArr = [];
  const len = arr.length;
  if (isValid(arr)) {
    for (let i = 0; i < len; i += 1) {
      const element = arr[i];
      const index = newArr.indexOf(element);
      if (index === -1) {
        newArr.push(element);
      }
    }
  }
  return newArr;
}

// sort 利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。
function unique2(arr) {
  let newArr = [];
  let srcArr = arr;
  if (isValid(arr)) {
    srcArr = arr.sort();
    newArr = [srcArr[0]];
    const len = srcArr.length;
    for (let i = 1; i < len; i += 1) {
      const ele = arr[i];
      if (ele !== arr[i + 1]) {
        newArr.push(ele);
      }
    }
  }
  return newArr;
}

// Array.includes
function unique3(params) {
  const newArr = [];
  const len = arr.length;
  if (isValid(arr)) {
    for (let i = 0; i < len; i += 1) {
      const element = arr[i];
      if (!newArr.includes(element)) {
        newArr.push(element);
      }
    }
  }
  return newArr;
}

const arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null,
  null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

// console.log('双重循环', unique(arr)); // [1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {}, {}]
// console.log('indexOf', unique1(arr)); // [1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {}, {}]
// console.log('sort：', unique2(arr)); // [ 0, 0, 1, 15, 'NaN', NaN, NaN, {}, {}, 'a', false, null, true, 'true' ]
console.log('includes', unique3(arr)); // [ 1, 'true', true, 15, false, undefined, null, NaN, 'NaN', 0, 'a', {}, {} ]
