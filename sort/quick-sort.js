const { swap, newArray, isOrdered } = require('./base')

const array = newArray(1000000)

// 利用 JS Array的方法实现
function quickSort(arr) {
    const length = arr.length;

    // 递归终结条件
    if (length <= 1) {
        return arr;
    }

    const leftArr = [],
        rightArr = [],
        middle = parseInt(length / 2),
        middleValue = arr.splice(middle, 1);

    for (let i = 0; i < length - 1; i++) {
        if (arr[i] < middleValue)
            leftArr.push(arr[i]);
        else
            rightArr.push(arr[i]);
    }

    return quickSort(leftArr).concat(middleValue, quickSort(rightArr));
}

// console.time('JS Sort')
// quickSort(array)
// console.timeEnd('JS Sort')

/**
 * 快速排序思想：
 * 
 * “分而治之”
 * 
 * 选取一个基准点，遍历数组，将大于基准点的，放到基准点右侧，反之放在左侧
 * 递归执行逻辑，直到将数组细分到 1 大小，即返回，确认排序完毕
 */

function quickSortOrignal(arr, left = 0, right = arr.length - 1) {
    // patch数组长度无需排序的情况
    if (arr.length <= 1) {
        return arr;
    }

    // 即本次迭代数组区间内的值还有 2 个以上时，仍需进行分区迭代
    if (left < right) {
        const midpoint = partition(arr, left, right);
        quickSortOrignal(arr, left, midpoint - 1); // 递归对左分区排序（可排除掉中点，中点已经排好了）
        quickSortOrignal(arr, midpoint + 1, right);
    }

    return arr;
}
// 将数组arr[left:right]进行分区，返回分区中点
function partition(arr, left, right) {
    let pivot = left; // 直接选取最左为基准点，方便后续遍历比较
    let movePoint = pivot + 1; // 基准点右侧第一位为待移动位置，也是从该位置开始比较

    for (let i = movePoint; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, movePoint++, i); // 交换 i 点到待移动点，待移动点后移一位
        }
    }

    // 扫描分区完毕后，将基准点移动到中间区域，如此基准点左右被两分
    swap(arr, pivot, movePoint - 1); // movePoint - 1 为当前左区右阈值
    return movePoint - 1;
}

// console.time('original')
// quickSortOrignal(array)
// console.timeEnd('original')

// ===> original 速度比 JS Sort 快 33 倍

console.time('original')
quickSortOrignal(array)
console.timeEnd('original')
console.log('isOrdered: ', isOrdered(array))

module.exports = {
    execQuickSort() {
        console.time('original')
        quickSortOrignal(array)
        console.timeEnd('original')
        console.log('isOrdered: ', isOrdered(array))
    }
}