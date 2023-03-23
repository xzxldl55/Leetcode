/**
 * 直接插入排序
 * 
 * 类似打牌洗牌，将新摸到的牌插入到已经洗好的牌堆中去。即，通过构建新的有序序列，而未排序数据则在有序序列中从后向前扫描，找到相对应位置插入
 * 
 * 1. 从第一个元素开始，该元素可认为已经被排序了
 * 2. 取出下一个元素，在已经排序的元素序列中从后向前扫描
 * 3. 如果被扫描元素，大于新的元素，则将被扫描元素后移一位
 * 4. 重复步骤3，直到扫描到元素小于等于该元素或所有有序元素扫描完毕
 * 5. 将该元素插入该位置
 * 6. 重复2~5
 * 
 * 特点：
 * 
 *  空间复杂度： O(1) 的原地排序
 *  时间复杂：min:O(n), max:O(n²), avg:O(n²)
 */

const { swap, newArray, isOrdered } = require('./base')

const array = newArray(100000)

function insertSort(arr) {
    const length = arr.length;
    if (length <= 1) {
        return arr;
    }

    for (let i = 1; i < length; i++) {
        const waitSortVal = arr[i]; // 待插入元素
        let searchIndex = i - 1; // 待搜索的有序序列右阈

        // 从后向前遍历有序序列，直到发现比待插入元素更小 / 扫描完毕 时终结。
        while (searchIndex >= 0 && arr[searchIndex] > waitSortVal) {

            // 大于待插入元素的，交换位置，如此会一直将 待比较 元素 waitSortVal 交换到合适位置
            swap(arr, searchIndex, searchIndex + 1);
            searchIndex--; // 向前扫描
        }
    }

    return arr;
}

console.time('insertSort')
insertSort(array)
console.timeEnd('insertSort')
console.log('isOrdered:', isOrdered(array))