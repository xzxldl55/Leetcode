/**
 * 归并排序：对一个数组做排序时，先将数组从中间分为前后两个部分，然后对前后两部分分别进行排序（分割，排序重复之），再将排序好的两部分合并
 * 特点：
 *   ① 不原地O(n)
 *   ② 时间 O(nlogn)
 */

const { newArray, isOrdered } = require('./base')

let array = newArray(1000000);

function mergeSort(arr) {
    const length = arr.length;

    // 拆分到长度 1 的数组（有序序列）
    if (length <= 1) {
        return arr;
    }

    const midIndex = length >> 1; // 右移一位，相当于 Math.floor(length / 2)

    // 合并左右两个有序序列（内部递归拆分 + 合并）
    return sort(mergeSort(arr.slice(0, midIndex)), mergeSort(arr.slice(midIndex)));

    // 顺序合并left/right两个有序序列
    function sort(leftArr, rightArr) {
        const result = []; // 最终合并后的有序序列
        let leftIndex, rightIndex;

        leftIndex = rightIndex = 0; // 双指针遍历左右两个有序序列

        // 从头开始比较两个有序序列，更小值先push到结果序列
        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
            if (leftArr[leftIndex] < rightArr[rightIndex]) {
                result.push(leftArr[leftIndex++]);
            } else {
                result.push(rightArr[rightIndex++]);
            }
        }

        // 处理循环内没有处理完的剩余序列
        while (leftIndex < leftArr.length) {
            result.push(leftArr[leftIndex++]);
        }
        while (rightIndex < rightArr.length) {
            result.push(rightArr[rightIndex++]);
        }

        return result;
    }
}

console.time('mergeSort');
array = mergeSort(array);
console.timeEnd('mergeSort');
console.log('isOrdered:', isOrdered(array));