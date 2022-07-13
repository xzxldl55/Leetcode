/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 *
 *
 * 首先我们设定几个概念符号：
 * 1. P(i, j) = Boolean 表示字符串 中 i～j 组成的子串是否是回文子串
 * 2. Si 表示字符串S的第i个字符
 *
 * 根据题意可列出以下状态转移方程
 * 1. P(i, i) = true 单个字符本身就是一个回文子串
 * 2. P(i, i + 1) = Si === S(i + 1) 相邻两个字符是否为子串，取决其是否相等
 * 3. P(i, j) = P(i + 1, j - 1) && (S(i) === S(j)) i～j 是否回文，取决于其次长子串是否回文 && Si === Sj 对称两侧字符是否相等
 *
 * 1. 中心拓展法：
 *
 * 根据 1，3 可以设计一个从中间向外扩散的查找方式，扫描字符串的每个字符，以其为基准向外扩散
 * 匹配左右字符是否相等的到P(i, j)
 *
 * 方程2.作为边界查询状态，当左右不等，但某方位与基准相等时，可确认回文字符串 i～i+1
 *
 * PS: 需要注意的是，回文字符长度可能为 奇/偶，则其回文中心长度为1/2，需要考虑到回文中心为2的情况，即以 (Si,Si+1) 为中心扩散
 *
 * 2. 动态规划：
 * 这里动态规划以来 方程 1/3 进行，设置dp[i][j]表，表示i～j是否为回文串，
 * 先用方程1，将其最小化填满，再双循环遍历填充整个dp表（方程3）
 *
 */
var longestPalindrome = function (s) {
    const len = s.length

    if (len === 1) {
        return s
    }
    if (len === 2) {
        return (s[0] === s[1]) ? s : s[0]
    }

    let base = 0
    let longest = s[0]

    for (; base < len; base++) {

        // 设置给予基准点的扩散值
        let oddI = base - 1,
            oddJ = base + 1,
            evenI = base,
            evenJ = base + 1

        // 再进行扩散搜索（根据1，3可知，在循环体内无需考虑(i, j)的子串，其必定回文，因为不回文时会自动跳出循环））
        // 1. 奇数回文中心  i <- base -> j
        while (oddI >= 0 && oddJ < len && s.charAt(oddI) === s.charAt(oddJ)) {
            longest = compareLongest(longest, s.substring(oddI, oddJ + 1))
            oddI--
            oddJ++
        }

        // 2. 偶数回文中心  i(base) <- -> j(base + 1)
        while (evenI >= 0 && evenJ < len && s.charAt(evenI) === s.charAt(evenJ)) {
            longest = compareLongest(longest, s.substring(evenI, evenJ + 1))
            evenI--
            evenJ++
        }
    }

    return longest

    function compareLongest(s1, s2) {
        return s1.length >= s2.length ? s1 : s2
    }
};

var longestPalindromeDynamicProgram = function (s) {
    const len = s.length

    if (len === 1) {
        return s
    }
    if (len === 2) {
        return (s[0] === s[1]) ? s : s[0]
    }

    const dp = new Array(len)
    let maxLenIndex = {
        start: 0,
        end: 0
    }

    new Array(len).fill(1).forEach((v, i) => {
        dp[i] = new Array(len)
        dp[i][i] = true // 自身到自身就是回文
    })

    // 设start/end为首位进行遍历填充，dp[start][end] = s[start] === s[end] && dp[start + 1][end - 1]
    for (let end = 1; end < len; end++) {

        // 只填写start < end 部分，大于部分（左下三角区域，不存在真实情况）
        for (let start = 0; start < end; start++) {
            dp[start][end] = (end - start + 1) <= 3 ? // 长度小于等于3时，直接判断首位是否相同即可
                s[start] === s[end] :
                s[start] === s[end] && dp[start + 1][end - 1] // 长度大于3时，首位相等 && 最长子串

            // 更新最长回文位置
            if (dp[start][end] && (end - start) > (maxLenIndex.end - maxLenIndex.start)) {
                maxLenIndex.start = start
                maxLenIndex.end = end
            }
        }
    }

    return s.substring(maxLenIndex.start, maxLenIndex.end + 1)
}

console.log(longestPalindromeDynamicProgram('caabaac'))
// @lc code=end
