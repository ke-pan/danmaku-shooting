function Danmaku(context) {
    this.context = context
    this.alive = false
    this.speed = 5
}

Danmaku.prototype.draw = function() {
    this.context.font = this.font
    this.context.fillStyle = this.color
    this.context.textBaseline = "top"
    this.context.fillText(this.word.content, this.x, this.y)
}

Danmaku.prototype.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
}

Danmaku.prototype.reset = function() {
    this.alive = false
};

Danmaku.prototype.init = function(word, y) {
    this.alive = true
    this.isColliding = false
    this.word = word
    this.font = word.font_size + 'px sans-serif'
    this.context.font = this.font
    this.width = this.context.measureText(word.content).width
    this.height = parseInt(word.font_size) + 4
    this.x = this.context.canvas.width
    this.y = y
    this.color = '#' + word.color.toString(16);
    this.fly()
}

Danmaku.prototype.fly = function() {
    this.clear()
    this.x = this.x - this.speed
    if (this.x + this.width < 0) {
        this.alive = false
    }
    else {
        this.draw()
    }
    if (this.isColliding) {
        this.clear()
    }
    else if (this.alive) {
        requestAnimationFrame(this.fly.bind(this))
    }

}

module.exports = Danmaku
