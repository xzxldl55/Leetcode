/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * 
 * 1. 同一位数进行相加，保留是否进位信息
 * 2. 循环两个链表（最终循环长度为Max(l1, l2)），从头部开始（即最后一位数）相加，如果短的那个链表没有next了，自动为其补零与长的相加
 * 
 * 时间复杂度： O(max(l1, l2))
 */
var addTwoNumbers = function (l1, l2) {
    const resNode = new ListNode(0)
    let nextNode = resNode;
    let isCarry = 0

    // 遍历直至l1 与 l2 都结束
    while (l1.val !== undefined || l2.val !== undefined) {
        nextNode.val = ((l1 && l1.val) || 0) + ((l2 && l2.val) || 0) + isCarry

        // 处理相加后进位的情况
        if (nextNode.val && nextNode.val >= 10) {
            nextNode.val %= 10
            isCarry = 1
        } else {
            isCarry = 0
        }

        // 未遍历完 l1 / l2 时，向下走一个node
        (l1.next || l2.next) && (nextNode = nextNode.next = new ListNode(0))

        // 默认给 {} 防止下个循环取值报错
        l1 = l1.next || {}
        l2 = l2.next || {}
    }

    // 最后一次相加如果需要进位则补充1
    isCarry && (nextNode.next = new ListNode(1))
    
    return resNode
};

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

const l1 = new ListNode(2, new ListNode(4, new ListNode(3)))
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)))

console.log(addTwoNumbers(l1, l2))
// @lc code=end