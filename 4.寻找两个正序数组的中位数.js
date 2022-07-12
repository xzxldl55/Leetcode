/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    nums1 = mergeSort(nums1, nums2);
    const len = nums1.length;
    return len % 2 === 0 ? (nums1[len / 2 - 1] + nums1[len / 2]) / 2 : nums1[Math.floor(len / 2)];
};

// 解法 1. 先归并排序，在找出来
function mergeSort(leftArr, rightArr) {
    let leftArrLen = leftArr.length,
        rightArrLen = rightArr.length,
        leftIndex = 0,
        rightIndex = 0,
        ret = [];

    while (leftArrLen > leftIndex && rightArrLen > rightIndex) {
        if (leftArr[leftIndex] <= rightArr[rightIndex]) {
            ret.push(leftArr[leftIndex++]);
        } else {
            ret.push(rightArr[rightIndex++]);
        }
    }

    if (leftIndex < leftArrLen) {
        ret.push(...leftArr.slice(leftIndex));
    }
    if (rightIndex < rightArrLen) {
        ret.push(...rightArr.slice(rightIndex));
    }
    return ret;
}
// @lc code=end

console.log(findMedianSortedArrays([2], []));
