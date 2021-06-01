/**
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 */

/**
  * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
  * 输出:
  [
    ["ate","eat","tea"],
    ["nat","tan"],
    ["bat"]
  ]

  所有输入均为小写字母。
  不考虑答案输出的顺序。
  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/group-anagrams
  */

/**
   * 解法一：暴力排序 sort + Map
   * @param {*} strs
   */
function groupAnagrams1(strs) {
  const hashMap = new Map();
  for (let i = 0; i < strs.length; i += 1) {
    const str = strs[i].split('').sort().join();
    if (hashMap.has(str)) {
      const temp = hashMap.get(str);
      temp.push(strs[i]);
      hashMap.set(str, temp);
    } else {
      hashMap.set(str, [strs[i]]);
    }
  }
  return [...hashMap.values()];
}

console.log(groupAnagrams1(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
