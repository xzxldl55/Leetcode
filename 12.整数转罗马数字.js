/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 * 
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

罗马数字中小的数字在大的数字的右边。但也存在特例，
例如 4 不写做 IIII，而是 IV。
数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。
同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

==> Hash 贪心算法：

1. 每次都取出最大的可转换数来进行字符匹配，这里我们被除数从 div = 1000 开始，先从千位开始取
   除法结果，即为当前计数单位下的数量 integerRes，接着用该数在map对应的计数单位中匹配即可

2. 取余为还未匹配的数，将 div / 10，进一步取下一个计数单位的数量，如此循环，直到最终剩余未匹配数 <= 0 即可。
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
    const changeMap = {
        1000: {
            1: 'M'
        },
        100: {
            1: 'C',
            5: 'D'
        },
        10: {
            1: 'X',
            5: 'L'
        },
        1: {
            1: 'I',
            5: 'V'
        }
    }

    let integerRes,
        div = 1000,
        res = '';
    while (num > 0) {
        integerRes = parseInt(num / div);
        num = num % div;
        
        if (integerRes <= 0) {
            div = div / 10;
            continue;
        }
        
        if (integerRes < 4) {
            res += new Array(integerRes).fill(changeMap[div][1]).join('');
        } else if (integerRes === 4) {
            res += changeMap[div][1] + changeMap[div][5];
        } else if (integerRes < 9) {
            res += changeMap[div][5] + new Array(integerRes - 5).fill(changeMap[div][1]).join('');
        } else if (integerRes === 9) {
            res += changeMap[div][1] + changeMap[div * 10][1];
        }
        div = div / 10;
    }

    return res;
};
// @lc code=end

console.log(intToRoman(1994));
// MCMXCIV
