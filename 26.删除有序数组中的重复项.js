/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    const len = nums.length

    if (!len || len === 1) {
        return len
    }

    /**
     * 同向双指针：
     *
     * 1. 第一个数可以跳过，从第二个数开始，左指针指向待赋值的位置（作为结果数组），右指针指向扫描位
     * 2. 当右指针当前位置值与上一位置值相等时，说明该值重复了，不需要被赋值到结果数组，直接跳过right++
     * 3. 当值不同时，说明该值为重复，赋值到left位置，left++。最终left即为结果数组长度，结果数组为 nums[0:left -1]
     */
    let left = 1;
    for (let right = 1; right < len; right++) {
        if (nums[right] !== nums[right - 1]) {
            nums[left++] = nums[right];
        }
    }

    return left;
};
// @lc code=end


removeDuplicates([1, 1, 2])
