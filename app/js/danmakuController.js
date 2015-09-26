function DanmakuController(words, chNum, width) {
    words.sort(function(a, b) {
        return a.stime - b.stime
    })
    this.words = words
    this.i = 0
    this.size = this.words.length
    this.chNum = chNum
    this.chanel = []
    for (var j = 0; j < chNum; j++) {
        this.chanel[j] = undefined
    }
    this.canvasWidth = width
}

DanmakuController.prototype.load = function(time) {
    for (; this.i < this.size && this.words[this.i].stime < time; this.i++) {
        for (var j = 0; j < this.chNum; j++) {
            var flyingWord = this.chanel[j]
            if (flyingWord === undefined ||
                flyingWord.x + flyingWord.width < this.canvasWidth) {
                var word = this.pool.get()
                if (word) {
                    word.init(this.words[this.i], 30 * j) // TODO
                    this.pool.put(word)
                    this.chanel[j] = word
                }
                break;
            }
        }
    }
};
