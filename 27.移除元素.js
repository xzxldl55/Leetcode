/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    const len = nums.length
    if (!len) {
        return 0
    }

    for (let i = len - 1; i >= 0; i--) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        }
    }

    console.log(nums)
    return nums.length
};
// @lc code=end

console.log(removeElement([1, 2, 3, 4, 5, 5, 6, 7], 5))

