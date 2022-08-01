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

    // 同向双指针
    let startCommonIndex = len - 1 // 从后开始往前搜索
    let endCommonIndex = startCommonIndex
    let commonNum = nums[startCommonIndex]

    for (let i = startCommonIndex - 1; i >= 0; i--) {

        // 因为是有序的，故此我们从后向前，遇到相同的继续将startCommonIndex，直到与commonNum不同
        // 此时移除 startCommonIndex + 1 ~ endCommonIndex 的值
        if (nums[i] === commonNum) { // 相同时继续前移
            startCommonIndex--
            continue
        }

        // 不同时，判断start～end大小 > 0即说明存在相同的 「如不能使用splice函数，其实可以将删除这一步，放到上面的startCommonIndex--来做，增加一个end - star判断条件即可」
        if (endCommonIndex - startCommonIndex) {
            nums.splice(startCommonIndex, endCommonIndex - startCommonIndex)
        }
        commonNum = nums[i] // 不论是否splice，都将commonNum前移，并重置当次start/end
        startCommonIndex = endCommonIndex = i
    }

    // 处理头部存在重复项的情况(因为扫描到头部已经跳出循环了)
    if (endCommonIndex - startCommonIndex) {
        nums.splice(startCommonIndex, endCommonIndex - startCommonIndex)
    }

    return nums.length
};
// @lc code=end


removeDuplicates([1, 1, 2])
