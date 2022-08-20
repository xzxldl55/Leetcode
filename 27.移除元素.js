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

    let left = 0;
    for (let right = 0; right < len; right++) {
        if (nums[right] !== val) {
            nums[left++] = nums[right];
        }
    }

    return left;
};
// @lc code=end

console.log(removeElement([1, 2, 3, 4, 5, 5, 6, 7], 10))

