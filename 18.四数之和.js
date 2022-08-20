/*
 * @lc app=leetcode.cn id=18 lang=javascript
 *
 * [18] 四数之和
 *
 * 解法与三数之和一模一样，just 多一层循环
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    const len = nums.length,
        res = [];
    if (len < 4) {
        return res;
    }

    nums = nums.sort((a, b) => a - b);
    for (let firstIndex = 0; firstIndex < len; firstIndex++) {
        const first = nums[firstIndex];

        // 第一个数就超过了目标值的 1/4，说明其与后面的数的组合必定 > target 可以退出循环了
        if (first > (target / 4)) {
            break;
        }

        // 去除重复值
        if (firstIndex > 0 && nums[firstIndex] === nums[firstIndex - 1]) {
            continue;
        }

        // 如当前循环值，与最末尾三数之和还是 < target，说明本次循环不可能找到 = target的情况，直接跳过
        if (nums[len - 1] + nums[len - 2] + nums[len - 3] + first < target) {
            continue;
        }

        for (let secondIndex = firstIndex + 1; secondIndex < len; secondIndex++) {
            const second = nums[secondIndex];

            // 去重，second与前一位比较（去除first是前一位的情况），如果相同则可跳过本次
            if ((secondIndex > firstIndex + 1) && (nums[secondIndex] === nums[secondIndex - 1])) {
                continue;
            }

            // 与上面循环同理，后二者数之和必然大于 first + second，故此必然超过target
            if (first + second > target / 2) {
                break;
            }


            // 与上面循环同理
            if (first + second + nums[len - 2] + nums[len - 1] < target) {
                continue;
            }

            let left = secondIndex + 1,
                right = len - 1;

            while (left < right) {
                const sum = first + second + nums[left] + nums[right];

                if (sum === target) {
                    res.push([first, second, nums[left], nums[right]]);

                    // 去重，当下一位left与当前left值相同，说明该组合结果已被记录过了，可直接跳过
                    while (nums[left] === nums[left + 1]) {
                        left++;
                    }
                    while (nums[right] === nums[right - 1]) {
                        right--;
                    }

                    // 当前组合已收集，将左右指针向中间移动
                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }
    return res;
};
// @lc code=end

