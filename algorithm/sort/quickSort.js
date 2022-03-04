/**
 * 快速排序
 * 基本思路： 通过一次排序将待排序数组分成部分，一部分记录的项都比另一部分的小
 *
 * 1、 在数据集之中，选择一个元素作为"基准"（pivot）。
 * 2、所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
 * 3、对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 */

const mockData = require('./mockData');

function quickSort1(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];
  const right = [];
  const left = [];

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort1(left).concat([pivot], quickSort1(right));
}


console.log(quickSort1(mockData.sortingArr));
