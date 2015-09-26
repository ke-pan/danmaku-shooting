function Danmaku(context) {
    this.context = context
    this.alive = false
    this.speed = 5
}

Danmaku.prototype.draw = function() {
    this.context.font = this.font
    this.context.fillStyle = this.color
    this.context.fillText(this.word.content, this.x, this.y)
}

Danmaku.prototype.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
}

Danmaku.prototype.reset = function() {
    this.alive = false
};

Danmaku.prototype.init = function(word) {
    this.word = word
    this.width = this.context.measureText(word.content).width
    this.height = parseInt(word.size) + 1
    this.x = this.context.canvas.width
    this.y = 0
    this.font = word.size + 'px'
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

    if (this.alive) {
        requestAnimationFrame(this.fly.bind(this))
    }

}
