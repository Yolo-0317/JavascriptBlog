/**
 * 插入排序
 *
 * 1、从索引为1的元素开始，认为该元素a之前的内容已经被排序
 * 2、在已排序的元素序列中从后向前扫描
 * 3、如果该元素a大于b，将a移到b之后
 * 4、重复步骤3，知道找到比小于或者等于b的新位置j
 * 5、将b插入到新位置j
 * 6、重复2-5
 *
 * 将左侧序列看成一个有序序列，每次将一个数字插入该有序序列。
 * 插入时，从有序序列最右侧开始比较，若比较的数较大，后移一位。
 */

const mockData = require('./mockData.js');

function insertSort(arr) {
  if (Array.isArray(arr)) {
    const len = arr.length;
    // 从索引为1的元素开始
    for (let i = 1; i < len; i += 1) {
      const key = arr[i];
      let j = i - 1;
      // 进入已排序中处理
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j -= 1;
      }
      arr[j + 1] = key;
    }
    console.log(arr);
  }
}

insertSort(mockData.sortingArr);
