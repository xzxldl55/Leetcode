/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) {
        return false
    } else if (x % 10 === 0 && x !== 0) {
        return false
    }

    let revertHalfNum = 0

    // 当取值一半 大于/等于 原数 时说明我们已经取到了一半/以上
    while (x > revertHalfNum) {

        // 不断从后取值 --> 直到取到了原数的一半为止
        revertHalfNum = revertHalfNum * 10 + x % 10
        x = parseInt(x / 10)
    }

    return revertHalfNum === x || parseInt(revertHalfNum / 10) === x
};
// @lc code=end

console.log(isPalindrome(123321))
