/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {
    // 直接利用JS提供的字符串/数组方法，一行写完
    // return s.split(' ').filter(v => v).slice(-1)[0].length;

    // 来点传统的，遍历整个字符串，记录遍历的单词（从第一个非空白字符，至遇到空格为止），返回最后一个记录的单词长度即可。
    let i = 0;
    const length = s.length;
    let word = '';
    let lastLen = 0;
    while(i < length) {
        if (s[i] !== ' ') {
            word += s[i++];
        } else { // 遇到空格，记录下当前单词长度，并清空当前单词
            lastLen = word.length || lastLen; // 使用 || lastLen 忽略空单词，即排除结尾多空格影响
            word = '';
            i++;
        }
    }

    if (word) {
        lastLen = word.length;
    }

    return lastLen;
};
// @lc code=end

console.log(lengthOfLastWord('luffy is still joyboy'))
console.log(lengthOfLastWord('   fly me   to   the moon  '))
console.log(lengthOfLastWord('   Hello World'))
