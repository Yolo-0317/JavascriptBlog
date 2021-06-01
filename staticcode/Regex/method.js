const reg = new RegExp('https*://\\w*\\.com', 'g');
const str = 'https://sdfs.com';
const replaceReg = /s(?=d)/g;
const replaceReg1 = /(?<=f)s/g;
// const replaceReg2 = /(?<=\/)(\w{4})(.)(\w{3})/g;
const replaceReg2 = new RegExp('(?<=/)(\\w{4})(.)(\\w{3})');

console.log((reg.exec(str)));
const newStr = str.replace(replaceReg, '12');
const newStr1 = str.replace(replaceReg1, '12');
const newStr2 = str.replace(replaceReg2, (match, $1, $2, $3) => {
  console.log(`match: ${match}`, $1, $2, $3);
  return '$3$2$1';
});
console.log(newStr, newStr1, newStr2);

const re = /(\w+)\s(\w+)/;
const str3 = 'John Smith';
const newStr3 = str3.replace(re, '$123423$2');
console.log(newStr3);
