/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * 先固定一个值，将其变成两数之和
 *
 * 为了去重，则需要将数组先排序，在通过前后值是否相同比对去重
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    const len = nums.length;
    const ret = [];
    if (len < 3) {
        return ret;
    }
    if (len === 3) {
        return !nums.reduce((p, v) => p + v, 0) ? [nums] : [];
    }

    // len > 4的情况
    nums = nums.sort((a, b) => a - b)
    for (let i = 0; i < len; i++) {
        const target = nums[i];

        // target为最左侧最小值（target + left + right），如果大于0，说明其组合不可能小于0,
        // 右侧都是 > 0，可以结束循环
        if (target > 0) {
            break;
        }

        // nums[i] === nums[i - 1] 表示当前i得到的数据会跟上一次迭代重复，可跳过
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        let left = i + 1,
            right = len - 1;

        // 左右指针不能重叠
        while (left < right) {
            const result = target + nums[left] + nums[right];
            if (result === 0) {

                // 记录本次结果
                ret.push([target, nums[left], nums[right]]);

                // 【驱虫】下次去值等于本次，则跳过下次，知道找到不同值位置
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (result < 0) { // 太小了，left右移，增大result
                left++;
            } else {
                right--;
            }
        }
    }

    return ret;
};
// @lc code=end

console.log(threeSum([-2,0,1,1,2]))
