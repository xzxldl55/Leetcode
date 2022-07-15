/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 *
 * 我们可以看到Z形为一个二维矩阵
 *
 * 1. 设每行字符串数组为s1, s2, s3, ..., sn 从结果来看，按行读取结果即为s1 + s2 + ... + sn
 * 2. 从原始数据填充来看，我们每次都需要从s1 -> s2 -> s(nRow - 1) -> s(nRow - 2) -> s1 周而复始，填充到对应行的末尾
 * 3. 如此根据2，我们可以直接遍历字符串，将其填充到对应行数组末尾 O(n)
 */
var convert = function(s, numRows) {
    const len = s.length
    if (numRows === 1 || numRows >= len) {
        return s
    }

    const res = new Array(numRows).fill('')
    let rowIndex = 0,
        flag = -1 // 表示向上走还是向下走（行）
    for (let i = 0; i < len; i++) {
        res[rowIndex] += s[i] // 对应行加上字符

        // 当在第一行/最后一行时，进行转向（上到下 -> 下到上 -> ...）
        if (rowIndex === 0 || rowIndex === numRows - 1)
            flag = -flag
        rowIndex += flag
    }
console.log(res)
    return res.reduce((pre, cur) => pre + cur)
};

console.log(convert('PAYPALISHIRING', 4))
// @lc code=end

