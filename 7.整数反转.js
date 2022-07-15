/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

// 解法1: 直接转换为字符出串数组进行反转，再拼接
var reverse = function (x) {
    const flag = x >= 0
    revertX = x.toString().split('').reverse()
    const res = parseInt(revertX.join(''))

    return flag ? isInArea(res) : isInArea(-res)

    function isInArea(num) {
        if (num > (2 ** 31) - 1) {
            return 0
        }
        if (num < -(2 ** 31)) {
            return 0
        }
        return num
    }
};

// 解法2: 纯数字解法，不断从x末尾取值加到新的结果集，在判断是否溢出
const numberReverse = function (x) {
    if (Math.abs(x / 10) < 1) {
        return x
    }

    let res = 0

    while (x !== 0) {
        const digit = x % 10
        x = parseInt(x / 10)

        res = res * 10 + digit
        if (res > (Math.pow(2, 31) - 1) || res < Math.pow(-2, 31)) {
            return 0
        }
    }

    return res
}

console.log(numberReverse(1433243))
// @lc code=end
