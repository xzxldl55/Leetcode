/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
    let blankFlag = 1,
        numberSymbol = 1,
        flag = 1,
        resNum = 0

    const maxNum = Math.pow(2, 31) - 1
    const minNum = Math.pow(-2, 31)

    for (let i = 0; i < s.length;) {

        // 匹配掉空白符
        if (blankFlag) {
            if (s[i] === ' ') {
                i++ // 继续匹配下一个字符
            } else {
                blankFlag = 0 // 空白符号以匹配结束，开始匹配正负符号
            }
            continue // 直接进入下一循环
        }

        // 匹配正负符号
        if (numberSymbol) {
            if (['-', '+'].includes(s[i])) {
                flag = s[i] === '-' ? 0 : 1
                i++
            }
            numberSymbol = 0 // 只做一次，直接下次循环，进入匹配数字
            continue
        }

        // 匹配数字
        if (isNumber(s[i])) {
            resNum = resNum * 10 + Number(s[i++])
        } else {
            break // 非数字，结束遍历
        }
    }

    function isNumber (val) {
        return !isNaN(parseInt(val))
    }

    return flag ? Math.min(maxNum, resNum) : Math.max(minNum, -resNum)
};

// 解法2: 正则直接匹配出来
const myAtoiReg = function (s) {
    const res = /^(\-|\+)?[0-9]+/.exec(s.trim()) || [0]

    return (
        res[0] < 0 ?
        Math.max(res[0], Math.pow(-2, 31)) :
        Math.min(res[0], Math.pow(2, 31) - 1)
    )
}
// @lc code=end

console.log(myAtoiReg("-91283472332"))
