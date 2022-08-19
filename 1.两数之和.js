/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = Object.create(null);

    for (let i = 0; i < nums.length; i++) {
        if (map[target - nums[i]] !== undefined) {
            return [map[target - nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }
};

var twoSumPointer = function (nums, target) {
    const len = nums.length;
    if (len === 2 && nums[0] + nums[1] === target) {
        return [0, 1];
    }

    // 记录原始位置
    const map = {}
    nums.forEach((n, i) => {
        if (map[n]) {
            map[n].push(i)
        } else {
            map[n] = [i]
        }
    })

    // 排序
    nums = nums.sort((a, b) => a - b);
    console.log(nums)
    let left = 0,
        right = len - 1;

    // 双指针遍历，得到解后，查询值的原下标
    while (left < right) {
        const result = nums[left] + nums[right];

        if (result === target) {
            return [map[nums[left]].pop(), map[nums[right]]].pop();
        } else if (result < target) {
            left++;
        } else {
            right--;
        }
    }
}
// @lc code=end
console.log(twoSumPointer([0, 2, 6, 3, 3], 6))
