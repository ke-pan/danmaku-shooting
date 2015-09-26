function Bullet(image, context) {
    this.image = image
    this.context = context
    this.width = image.width
    this.height = image.height
    this.x = 0
    this.y = 0
    this.speed = 10
    this.alive = false
}

Bullet.prototype.draw = function() {
    this.context.drawImage(this.image, this.x, this.y)
};

Bullet.prototype.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
};

Bullet.prototype.init = function(x, y) {
    this.x = x
    this.y = y
    this.alive = true
    this.fly()
};

Bullet.prototype.reset = function() {
    this.x = 0
    this.y = 0
    this.alive = false
};

Bullet.prototype.fly = function() {
    this.clear()
    this.x = this.x + this.speed
    if (this.x > this.context.canvas.width) {
        this.reset()
    }
    else {
        this.draw()
    }
    if (this.alive) {
        requestAnimationFrame(this.fly.bind(this))
    }
}
