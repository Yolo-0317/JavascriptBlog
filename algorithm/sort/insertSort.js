/**
 * 插入排序
 * 
 * 1、从索引为1的元素开始，认为该元素a已经被排序
 * 2、取出下一个元素b，在已排序的元素序列中从后向前扫描
 * 3、如果该元素a大于b，将a移到b之后
 * 4、重复步骤3，知道找到比小于或者等于b的新位置j
 * 5、将b插入到新位置j
 * 6、重复2-5
 */

const mockData = require('./mockData.js');

function inserSort(arr) {
  if (Array.isArray(arr)) {
    let len = arr.length;
    // 从索引为1的元素开始
    for (let i = 1; i < len; i++) {
      let key = arr[i];
      let j = i - 1;
      // 进入已排序中处理
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    console.log(arr);
  }
}

inserSort(mockData.sortingArr);
