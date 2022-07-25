/*
 * @lc app=leetcode.cn id=169 lang=javascript
 *
 * [169] 多数元素
 */

// @lc code=start
/**
 * 摩尔投票法：
 * 前提：必定存在大于n/2占位的数字
 * 先认定第一个数字就是占位大于n/2的结果
 * 对数组进行遍历，当发现相同数字时count++，
 * 当发现数字不同时进行--，当count === 0，时更换当前数字，count = 1
 * 直到遍历完成
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const len = nums.length
    if (len === 1 || len === 2) {
        return nums[0]
    }

    const moreNum = {
        num: nums[0],
        count: 1
    }

    for (let i = 0; i < len; i++) {
        if (nums[i] === moreNum.num) {
            moreNum.count++
            continue
        }
        if (!(--moreNum.count)) {
            moreNum.num = nums[i]
            moreNum.count = 1
        }
    }

    return moreNum.num
};

/**
 * 根据题意可知，我们要寻找的数为众数，且出现次数大于 n/2
 * 故此，讲数组排序后，第n/2个数字必也是这个众数
 * @param {*} nums
 */
var majorityElementHalf = function (nums) {
    const len = nums.length
    if (len === 1 || len === 2) {
        return nums[0]
    }

    nums = nums.sort((a, b) => a - b)
    return nums[parseInt(len / 2)]
}
// @lc code=end

console.log(majorityElement([2,2,1,1,1,2,2]))
console.log(majorityElementHalf([2,2,1,1,1,2,2]))
