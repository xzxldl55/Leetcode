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
// var isPalindrome = function(x) {
//     if (x < 0)
//         return false;
//     if (x === 0 || x < 10)
//         return true;

//     const str = x.toString();
//     const isOdd = str.length % 2 === 0;
//     const midI = Math.floor(str.length / 2);
//     const leftStr = str.slice(0, midI);
//     const rightStr = str.slice(isOdd ? midI : midI + 1);

//     if (leftStr === rightStr.split('').reverse().join('')) {
//         return true;
//     }
//     return false;
// };

// 纯数字解法
var isPalindrome = (x) => {
    if (x < 0 || x % 10 === 0)
        return false;
    if (x === 0 || x < 10)
        return true;
    
    let div = 1;

    // 获取当前
    while (x / div >= 10)
        div *= 10;
    while (div >= 10) {
        x / div
    }
    
};
// @lc code=end

