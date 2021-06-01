/**
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。
 * !!!!!但是，数组中同一个元素不能使用两遍。
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/two-sum
 */

/**
 * 给定 nums = [2, 7, 11, 15], target = 18
 * 因为 nums[1] + nums[2] = 7 + 11 = 18
 * 所以返回 [1, 2]
 */

// 主要思路是通过差值来寻找。

// 普通写法
function twoSum(nums, target) {
  let res;
  nums.forEach((num, index) => {
    const num1 = target - num;
    const curIndexOfNum1 = nums.indexOf(num1);
    if (curIndexOfNum1 > -1) {
      res = ([index, nums.indexOf(num1)]);
    }
  });
  return res;
}

console.log(twoSum([5, 2, 11, 15, 7, 6], 9));

/**
 * 纯ES6写法，利用新的数据结构Map
 * ES6 提供了 Map 数据结构。
 * 它类似于对象，也是键值对的集合，
 * 但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
 * https://es6.ruanyifeng.com/#docs/set-map#Map
 * @param {*} nums
 * @param {*} target
 */
function towSumAdvance(nums, target) {
  const targetMap = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const key = target - nums[i];
    if (targetMap.has(key)) {
      return [targetMap.get(key), i];
    }
    targetMap.set(nums[i], i);
  }
  return [];
}
console.log(towSumAdvance([5, 2, 11, 15, 7, 6], 9));
