/*
 * @lc app=leetcode.cn id=42 lang=javascript
 *
 * [42] 接雨水
 *
 * 题解思路：
 *
 * 按列计算，每列可接雨水体积为 1 * Min(当前列左侧最高柱子, 当前列右侧最高柱子)
 * 理解了这一点后，就很容易做出解法了，我们遍历每一列，在计算其左右最高点即可得到当前列雨水量
 */

// @lc code=start
/**
 * 双指针解法
 * @param {number[]} height
 * @return {number}
 */
var trapTwo = function(height) {
    const len = height.length;
    if (!len) {
        return 0;
    }

    let left = 1, // 左指针，首尾接不到雨水，故此可以直接跳过
        leftMax = height[0], // 当前height[index] 左侧最高点
        right = len - 2, // ～
        rightMax = height[len - 1], // ～
        res = 0;

    // 需要取=，否则会漏掉某一侧的初始位置的雨水量
    while (left <= right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);

        if (leftMax < rightMax) { // 选择较小边，即为当前序列雨桶最短板（基于上述，我们始终会在左右找最大，再在if中找较小边，故此我们得到的一定是一个较小边准确值）
            res += leftMax - height[left++]
        } else {
            res += rightMax - height[right--];
        }
    }

    return res;
};

/**
 * 动态规划法
 *
 * 由思路可得，我们需要计算每列的左右两侧的最大高度中较小的那个，
 * 而当前列左侧最大的为，(当前列前一列左侧最大, 当前列前一列高度)
 * 右侧同理
 * 如此可得转移方程 maxLeftHeight(i) = Max(maxLeftHeight(i - 1), h(i - 1))
 * @param {Array<number>} height
 */
var trap = (height) => {
    const len = height.length;
    if (!len) {
        return 0;
    }

    // 构造左右最大边数组
    const leftMax = [height[0]],
        rightMax = new Array(len).fill(0);
    rightMax[len - 1] = height[len - 1];

    // 状态转移方程实现，推广到整个数组
    for (let i = 1; i < len; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        rightMax[len - 1 - i] = Math.max(rightMax[len - i], height[len - 1 - i]);
    }

    // 直接计算每列的雨水，相加
    return height.reduce((pre, cur, i) => (pre + Math.min(leftMax[i], rightMax[i]) - cur), 0)

}
// @lc code=end

console.log(trapTwo([4,2,0,3,2,5]))

