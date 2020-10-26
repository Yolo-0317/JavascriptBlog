/**
 * async函数返回一个 Promise 对象，可以使用then方法添加回调函数。
 * 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
 */
const fs = require('fs');

const readFile = function (fileName) {
  console.log('readfile', fileName);
  return new Promise(((resolve, reject) => {
    fs.readFile(fileName, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  }));
};

const asyncReadFile = async function () {
  const f1 = await readFile('../generator/mock/1.txt');
  const f2 = await readFile('../generator/mock/2.txt');
  console.log(f2.toString());
  // console.log(f2.toString());
  // throw new Error('出错了');

  return f1;
};

asyncReadFile().then((file) => { console.log(file.toString()) }).catch(error => console.log(error));
