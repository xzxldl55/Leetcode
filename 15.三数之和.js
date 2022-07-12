/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const len = nums.length;
    const ret = [];
    if (len < 3) {
        return ret;
    }
    if (len === 3) {
        return !nums.reduce((p, v) => p + v) ? ret : [nums];
    }

    // len > 4的情况
};
// @lc code=end
