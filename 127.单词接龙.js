/*
 * @lc app=leetcode.cn id=127 lang=javascript
 *
 * [127] 单词接龙
 *
 * 图/BFS
 */

// @lc code=start
/**
 * 根据题意有以下几点可知：
 *
 * 1. 我们可以将beginWord 与 wordList构成一张图，每个单词记为一个点，当两点之间仅替换一个字母即可相同时，认为两点有一条双向边
 * 2. 根据题意，我们要寻找从点beginWord到endWord的最短路径，即寻找图中点到点最短路径
 *
 * 分解问题：
 * 1. 将wordList与beginWord转换为图
 * 2. 在途中寻找beginWord到endWord的最短路径
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {

    // 当wordList不存在endWord时，必没有到达路径
    if (!wordList.includes(endWord)) {
        return 0
    }

    const wordSet = new Set(wordList)
    const queue = [[beginWord, 1]] // 遍历队列，存放[word, 对应到达该word的步数]

    while (queue.length) {
        const [word, step] = queue.pop()
        if (word === endWord) { // 找到了直接返回步数
            return step
        }

        for (let bWord of wordSet) {
            if (isSimilar(word, bWord) === 1) { // 找到存在可达边的，加入队尾
                queue.unshift([bWord, step + 1])
                wordSet.delete(bWord) // 已被加入过队列，无需在放进来了
            }
        }
    }

    return 0

    function isSimilar (word1, word2) {
        let changes = 0
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] != word2[i]) changes += 1
        }
        return changes
    }

};
// @lc code=end

console.log(ladderLength('hit', 'cog', ["hot","dot","dog","lot","log","cog"]))
