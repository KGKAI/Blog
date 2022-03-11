/*
 * @lc app=leetcode.cn id=208 lang=javascript
 *
 * [208] 实现 Trie (前缀树)
 */

// @lc code=start
function TrieNode() {
    this.isEnd = false;
    this.children = new Array(26).fill('')
}

var Trie = function() {
    this.root = new TrieNode();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    let p = this.root;
    for (let i = 0; i < word.length; i++) {
        const ch = word.charCodeAt(i) - 97;
        if (!p.children[ch]) {
            p.children[ch] = new TrieNode()
        }
        p = p.children[ch];
    }
    p.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let p = this.root;
    for (let i = 0; i < word.length; i++) {
        const ch = word.charCodeAt(i) - 97;
        if (!p.children[ch]) return false;
        p = p.children[ch];
    }

    return p.isEnd;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let p = this.root;
    for (let i = 0; i < prefix.length; i++) {
        const ch = prefix.charCodeAt(i) - 97;
        if (!p.children[ch]) return false;
        p = p.children[ch];
    }

    return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
// @lc code=end

