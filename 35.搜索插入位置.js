/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0,
        right = nums.length - 1,
        mid = Math.floor((right + left) / 2),
        pos = nums.length; // 默认插到最后面

    while (left <= right) {

        // 二分法，找到最逼近的刚好大于或等于target的位置，即为待插入位置，如果一直找不到，则应该要插入到最后
        if (target <= nums[mid]) { // [left, ..., target,...?,  mid]
            pos = mid; // 暂时认为插入到mid
            right = mid - 1; // 右指针左移
        } else {
            left = mid + 1;
        }
        mid = Math.floor((left + right) / 2);
    }

    return pos;
};
// @lc code=end

searchInsert([1, 2, 3, 5], 5);
