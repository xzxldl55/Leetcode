/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 * 
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
给定一个罗马数字，将其转换成整数。
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const romanSymbolMap = [
        ['M', 1000],
        ['CM', 900],
        ['D', 500],
        ['CD', 400],
        ['C', 100],
        ['XC', 90],
        ['L', 50],
        ['XL', 40],
        ['X', 10],
        ['IX', 9],
        ['V', 5],
        ['IV', 4],
        ['I', 1]
    ];

    let res = 0;

    for (let romanSymbol of romanSymbolMap) {
        const symbolRegExp = new RegExp(`^${romanSymbol[0]}+`, 'g');
        const regRes = symbolRegExp.exec(s);
    
        if (!regRes) {
            continue;
        }

        // 计算当前字符对应的数字
        res += romanSymbol[1] * (regRes[0].split(romanSymbol[0]).length - 1);

        // 移除当前已匹配字符
        // s = s.slice(regRes[0].length);
        s = s.replace(regRes[0], '')
    }

    return res;
};

// 不适用正则的方法
var romanToIntNoReg = function(s) {
    const romanSymbolMap = {
        'M': 1000,
        // 'CM': 900,
        'D': 500,
        // 'CD':400,
        'C': 100,
        // 'XC':90,
        'L': 50,
        // 'XL': 40,
        'X': 10,
        // 'IX': 9,
        'V': 5,
        // 'IV': 4,
        'I': 1
    };

    let res = 0;
    
    for (let i = 0; i < s.length; i++) {
        let num = romanSymbolMap[s.charAt(i)]; // 获取当前字符对应数字

        // 如果当前字符对应数字还要小于下一个字符对应数字，此时，对应了题意的特殊情况，我们将当前字符数字作为负数处理（∵这里特殊情况本质其实就是后一个字符减去前一个字符的数字）
        if (i < s.length - 1 && romanSymbolMap[s.charAt(i)] < romanSymbolMap[s.charAt(i + 1)]) {
            num = -num
        }
        res += num;
    }

    return res;
};
// @lc code=end

// console.log(romanToIntNoReg('MCMXCIV'));

