/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 * 
 * 找到两条边 n1/n2
 * area = (n2 - n1) * Math.min(n1, n2)
 * Max(area)
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let left = 0,
        right = height.length - 1,
        max = 0;

    while (left < right) {
        max = Math.max(Math.min(height[right], height[left]) * (right - left), max);
        (height[right] < height[left]) ? right-- : left++;
    }
    return max;
};

console.log(maxArea([1, 5, 3, 8, 9, 10, 12]))
// @lc code=end

