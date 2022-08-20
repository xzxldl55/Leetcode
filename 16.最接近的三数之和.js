/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 *
 * 思路与三数之和一致，排序，固定一端，转为两数之和，双指针进行遍历
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    const len = nums.length;
    let sum = 0,
        similar = null; // 近似度
    if (len < 3) {
        return sum;
    }

    nums = nums.sort((a, b) => a - b);

    for (let i = 0; i < len; i++) {
        const firstVal = nums[i];
        let left = i + 1,
            right = len -1;

        while (left < right) {
            const res = firstVal + nums[left] + nums[right];
            const diff = Math.abs(target - res);

            // 近似度更高，重新赋值sum
            if (similar === null || diff < similar) {
                sum = res;
                similar = diff;
            }

            if (res === target) {
                return sum;
            } else if (res < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return sum;
};
// @lc code=end

console.log(threeSumClosest([-5, 3, 1, -1], 10))
