/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 * 
 * 1. 题意可知，需要按照顺序对字符进行匹配，使用栈结构非常契合当前问题。
 * 2. 我们从头到尾遍历字符串一次，每次将栈顶元素取出，与当前遍历元素进行比较
 *  1) 栈顶为空：即当前遍历字符之前的字符都已经复合匹配条件，此时检查当前字符，如果非开始括号（)}]）则后续无字符能与该字符匹配，直接返回false，否则入栈。
 *  2) 栈顶非空：比较栈顶元素与当前字符，能够凑成一对时，栈顶出栈，并跳过本次迭代。未匹配时检查当前字符，非开始括号情况，返回false，否则入栈当前字符。
 * 3. 直至遍历完毕，最后检查栈，非空时标识有符号未能匹配成功，返回false，否则返回true。
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const length = s.length;

    // 闭合括号map
    const closeBracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    const startBrackets = Object.values(closeBracketMap);

    // 从头到尾遍历
    for (let i = 0; i < length; i++) {
        const str = s[i];
        const stackHead = stack.pop();

        // 栈为空情况，将当前括号入栈（如当前括号非起始括号，可以直接退出）
        if (!stackHead) {
            if (!startBrackets.includes(str)) {
                return false;
            }
            stack.push(str);
            continue;
        }

        // 比较栈顶与当前遍历括号，是否能凑成一对，如能凑成一对，则将二者消消乐
        if (stackHead === closeBracketMap[str]) {
            continue;
        }

        // 否则，将括号入栈（同样检查入栈括号，非起始括号情况，直接退出）
        if (!startBrackets.includes(str)) {
            return false;
        }
        stackHead && stack.push(stackHead);
        stack.push(str);
    }

    return !stack.length;
};
// @lc code=end

console.log(isValid('{([]){}}'));
console.log(isValid("(){}}{"));
console.log(isValid('}{}{}([])'));

