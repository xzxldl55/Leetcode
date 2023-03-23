/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
    const numberLetterMap = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'j'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
    }
    const length = digits.length;
    if (length <= 1) {
        return numberLetterMap[digits] || [];
    }

    return [...combine(numberLetterMap[digits[0]], digits.slice(1))]

    function combine (alreadyCombine, restDigits) {
        if (restDigits.length === 1) {
            const restDigitMap = numberLetterMap[restDigits];
            return alreadyCombine.map(v => restDigitMap.map(rest => v + rest));
        }
    }
};
// @lc code=end

console.log(letterCombinations('5'));

