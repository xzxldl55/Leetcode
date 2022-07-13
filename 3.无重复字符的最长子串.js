/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 *
 * 思路：
 * 1. 双指针，一个为start基准，一个end向后扫描
 * 2. 扫描过的字符，放入map，每次end扫描时在map中匹配，如果有相同的了，start移动到前一个相同的后一位，重新开始扫描
 * 3. map存放(str, index)
 */

// @lc code=start
/**
 * 思路想到了滑动窗口，没完全滑明白版本 O(n ^ 2)
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    const map = new Map();
    const len = s.length;
    let maxLen = 0;
    let start = 0;
    let end = 1;
    map.set(s[start], start);

    if (len <= 1) {
        return len;
    }

    while (start < len && end < len) {
        if (map.has(s[end])) {
            // 匹配到相同字符，此时计算len，并位移start/end分别为 与end匹配的字符后一位，start后一位
            maxLen = Math.max(maxLen, end - start);

            // 如abcicdefgh,第一次我们匹配abcic，end为 4-“c”，与之匹配的为 2-“c”，可以确认的是 2-“c” 之前的字符向后，因为必然包括 2-4 的匹配
            // 一定短于0-4的匹配，故此，我们start可以直接滑动到 2-“c” 匹配之后，start = 2 + 1，end = 2 + 1 + 1
            start = map.get(s[end]) + 1;
            end = start + 1;

            map.clear();
            map.set(s[start], start);
            continue;
        }

        // 为匹配到，直接将当前end存入map，并后移
        map.set(s[end], end++);
    }
    maxLen = Math.max(maxLen, end - start);
    return maxLen;
};

// 滑动窗口，仅需遍历一次O(n)，其实上面的也是一样的思路，只是做了多余的map处理，导致需要重新遍历一下
var lengthOfLongestSubstringOneFor = function (s) {
    if (!s.length || s.length === 1) {
        return s.length;
    }

    let start = 0,
        len = s.length,
        maxLen = 0,
        end = 1;

    const map = new Map();
    map.set(s[start], start);

    for (; end < len; end++) {
        // 从 start - i 匹配到相同字符(前一条件匹配字符，后一条件过滤已完成匹配的字符段)
        if (map.get(s[end]) !== undefined && map.get(s[end]) >= start) {
            maxLen = Math.max(maxLen, end - start);
            start = map.get(s[end]) + 1; // 被匹配到的字符往前都已经不会超过maxLen长度了，直接start跳跃到其后
        }
        map.set(s[end], end);
    }

    maxLen = Math.max(maxLen, end - start);

    return maxLen;
};

console.log(lengthOfLongestSubstringOneFor('abcabcbb'));
// @lc code=end
