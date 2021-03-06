function Ship(image, context) {
    this.image = image
    this.context = context
    this.width = image.width
    this.height = image.height
    this.speed = 3
    this.shootRate = 12
    this.counter = 0
    this.alive = false
}

Ship.prototype.init = function(x, y) {
    this.x = x
    this.y = y
    this.alive = true
    this.isColliding = false
    this.draw()
};

// TODO inherit
Ship.prototype.draw = function() {
    this.context.drawImage(this.image, this.x, this.y)
};

Ship.prototype.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
};

Ship.prototype.move = function(dx, dy) {
    if (dx !== 0 || dy !== 0) {
        this.clear()
            // x
        this.x += dx
        if (this.x < 0) {
            this.x = 0
        }
        else if (this.x + this.width > this.context.canvas.width) {
            this.x = this.context.canvas.width - this.width
        }
        // y
        this.y += dy
        if (this.y < 0) {
            this.y = 0
        }
        else if (this.y + this.height > this.context.canvas.height) {
            this.y = this.context.canvas.height - this.height
        }

        this.draw()
    }

};

Ship.prototype.act = function() {
    var dx = 0,
        dy = 0
    if (KEY_STATUS.right) {
        dx = this.speed
    }
    else if (KEY_STATUS.left) {
        dx = -this.speed
    }

    if (KEY_STATUS.down) {
        dy = this.speed
    }
    else if (KEY_STATUS.up) {
        dy = -this.speed
    }

    this.move(dx, dy)

    if (KEY_STATUS.space) {
        this.fire()
    }
    this.detectCollision()
    if (this.isColliding) {
        this.clear()
        this.gameover()
    }
    else if (this.alive) {
        requestAnimationFrame(this.act.bind(this))
    }
};

Ship.prototype.fire = function() {
    this.counter++;
    if (this.counter > this.shootRate) {
        var bullet = this.bullets.get()
        bullet.init(this.x + this.width,
            this.y + (this.height - bullet.height) / 2)
        this.bullets.put(bullet)
        this.counter = 0
    }
};

// TODO MIXIN
Ship.prototype.detectCollision = function() {
    var obj = this.collideWith.getObjects()
    for (var i = 0; i < obj.length; i++) {
        if (this.x < obj[i].x + obj[i].width &&
            this.x + this.width > obj[i].x &&
            this.y < obj[i].y + obj[i].height &&
            this.y + this.height > obj[i].y) {

            this.alive = obj[i].alive = false
            this.isColliding = obj[i].isColliding = true
            break
        }
    }
}

module.exports = Ship
