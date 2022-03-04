
function recursionSum(arr, sum = 0) {
  let newSum = sum;
  if (arr.length === 0) {
    return newSum;
  }

  const arr1 = arr.shift();
  newSum += arr1;
  return recursionSum(arr, newSum);
}

const sum = recursionSum([2, 4, 6]);
console.log(sum);
