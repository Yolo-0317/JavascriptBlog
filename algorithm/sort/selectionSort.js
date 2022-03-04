/**
 * 选择排序
 *
 * 1、开始时有序区为空，无序区arr
 * 2、从第i次排序中，选择无序区中值最小的项，记录其索引minIndex；将minIndex的项与i项交换，
 * 3、执行n-1次
 *
 */

const mockData = require('./mockData');

function selectionSort(arr) {
  const len = arr.length;
  let minIndex = 0;
  let temp = 0;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    // 在无序值中寻找最小值，获取最小元素的索引
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 将i元素与最小索引元素进行交换
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.log(arr);
}

selectionSort(mockData.sortingArr);
