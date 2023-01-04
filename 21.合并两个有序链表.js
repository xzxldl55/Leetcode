/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

ListNode.prototype.traverse = function () {
    console.log(this.val, ' -> ');
    if (this.next) {
        this.next.traverse();
    } else {
        console.log(' over!');
    }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 * 
 * 根据题意，直接单指针遍历两个链表即可：
 * 1. 遍历两个链表，直至某个链表遍历结束(while(list1 && list2))
 * 2. 将值较小的链表节点加入新链表，并将新链表与取值链表都向后移动
 * 3. 结束遍历后，检查是否存在未遍历完毕的链表，存在则将其内容都复刻到新链表
 * 4. 返回新链表的头节点。
 */
var mergeTwoLists = function(list1, list2) {
    // 检查待合并链表是否有空链表，存在空链表时，直接返回/复刻另一个链表即可
    if (!list1) {
        return list2;
    }
    if (!list2) {
        return list1;
    }

    // 初始化值
    let newList = new ListNode();
    const newListHead = newList;
    if (list1.val < list2.val) {
        newList.val = list1.val;
        list1 = list1.next;
    } else {
        newList.val = list2.val;
        list2 = list2.next;
    }

    // 遍历两个待合并链表，较小者先入
    while(list1 && list2) {
        if (list1.val <= list2.val) {
            newList.next = new ListNode(list1.val);
            newList = newList.next;
            list1 = list1.next;
        } else {
            newList.next = new ListNode(list2.val);
            newList = newList.next;
            list2 = list2.next;
        }
    }

    if (list1) {
        newList.next = list1; // 未遍历部分直接拼上去
        // 或者复刻一份（看需求）
        // while(list1) {
        //     newList.next = new ListNode(list1.val);
        //     newList = newList.next;
        //     list1 = list1.next;
        // }
    }
    
    if (list2) {
        newList.next = list2;
        // while(list2) {
        //     newList.next = new ListNode(list2.val);
        //     newList = newList.next;
        //     list2 = list2.next;
        // }
    }

    return newListHead;
};
// @lc code=end
const l1 = new ListNode(1, new ListNode(3, new ListNode(5)));
const l2 = new ListNode(1, new ListNode(2, new ListNode(6)));
const m = mergeTwoLists(l1, l2);
m.traverse();
