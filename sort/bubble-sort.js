/**
 * 冒泡排序
 * 
 * 顾名思义，它需要依次遍历数组每一个元素，将其一一与相邻元素左比，一趟循环下来，则能够确定一个“最末尾”的数值，最终最小值将在一次次循环中冒到数组最顶层。
 * 
 * 根据解释我们可知，冒泡排序一次循环，排好一个数，在每次循环中又存在一个内循环，将“相邻数”不断比较，大着放后。是 O(n ^ 2) 算法
 */

const { swap, newArray, isOrdered } = require("./base");
const { execQuickSort } = require('./quick-sort')

const array = newArray(100000)

function bubbleSort(arr) {
    const length = arr.length;
    if (length <= 1) {
        return arr;
    }

    for (let i = 0; i < length; i++) {
        // 内循环，遍历到 leng - i 即可，最末尾的 i 个数已在前面的循环中排序好了无需再遍历
        for (let j = 0; j < length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }

    return arr;
}

console.log('\n\n ============================================ \n\n')
console.time('bubble')
bubbleSort(array)
console.timeEnd('bubble')
console.log('isOrdered: ', isOrdered(array))