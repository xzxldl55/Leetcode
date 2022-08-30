/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let res = strs[0];

    if (strs.length <= 1) {
        return res || '';
    }

    // 第一个值已经作为 公共前缀 的初始值了，可以去掉
    strs.shift();
    for (let s of strs) {

        // 获取 当前字符串 与 当前 公共前缀 二者的最小长度，该长度为迭代长度
        const len = Math.min(s.length, res.length);

        // 如果当前遍历字符串小于当前公共前缀长度，说明当前公共前缀长了，直接截取到当前字符长度。
        if (s.length < res.length) {
            res = res.slice(0, s.length);
        }
        for (let i = 0; i < len; i++) {

            // 找到不一样的字符情况
            if (s[i] !== res[i]) {
                res = res.slice(0, i);
                break;
            }
        }
    }

    return res;
};
// @lc code=end

console.log(longestCommonPrefix(["ab", "a"]))
