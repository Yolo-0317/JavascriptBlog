const _ = require('lodash');

const names = ['sy', 'cy', 'dd', 'gf', 'kl', 'yh'];
// 获取最小值到最大值之前的整数随机数
function GetRandomNum(Min, Max) {
  const Range = Max - Min;
  const Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}
const result = [];

function getResult(arr) {
  const num = GetRandomNum(0, _.size(names) - 1);
  result.push(arr[num]);
  _.remove(names, (r, i) => i === num);
  if (!_.isEmpty(names)) {
    getResult(names);
  }
}

getResult(names);
result.push(_.head(result));
console.log(result.join(' > '));
