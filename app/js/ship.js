function Ship(image, context) {
    this.image = image
    this.context = context
    this.width = image.width
    this.height = image.height
    this.speed = 3
    this.shootRate = 15
    this.counter = 0
}

Ship.prototype.init = function(x, y) {
    this.x = x;
    this.y = y;
};

Ship.prototype.draw = function() {
    this.context.drawImage(this.image, this.x, this.y)
};

Ship.prototype.clear = function() {
    this.context.clearRect(this.x, this.y, this.width, this.height)
};

Ship.prototype.move = function(dx, dy) {
    this.clear()
        // x
    this.x += dx
    if (this.x < 0) {
        this.x = 0
    }
    else if (this.x + this.width > this.context.width) {
        this.x = this.context.width - this.width
    }
    // y
    this.y += dy
    if (this.y < 0) {
        this.y = 0
    }
    else if (this.y + this.height > this.context.height) {
        this.y = this.context.height - this.height
    }

    this.draw()
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
        this.fire
    }
};

Ship.prototype.fire = function() {

};
