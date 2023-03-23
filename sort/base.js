// 交换元素
function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function isOrdered(arr, type = 'asc') {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
        if ((type === 'asc' && arr[i] > arr[i + 1]) || (type === 'desc' && arr[i] < arr[i + 1])) {
            return false;
        }
    }
    return true;
}

const newArray = (length) => new Array(length).fill(1).map(v => parseInt(Math.random() * length));

module.exports = {
    swap,
    newArray,
    isOrdered
}