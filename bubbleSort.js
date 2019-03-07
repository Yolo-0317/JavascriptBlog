/**
 * 冒泡算法
 * 
 * 1、对比相邻的两个元素，值较大的排到后面
 * 2、循环对比相邻元素，这样比较完一次后排在最后的是最大值
 * 3、得到一次最大值后继续重复前两步，每次重复时不再比较前一次比较得到的最大值
 * 
 */

const mockData = require("./mockData");

function bubbleSort(arr) {
  if (Array.isArray(arr)) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    console.log(arr);
  }else{
    console.log('请输入数组')
  }
}

bubbleSort(mockData.sortingArr);
