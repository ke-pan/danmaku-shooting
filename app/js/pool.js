function Pool(num, constructor, image, context) {
    this.pool = []
    this.size = num

    for (var i = 0; i < num; i++) {
        this.pool[i] = new constructor(image, context)
    }
}

Pool.prototype.get = function() {
    if (!this.pool[this.size - 1].alive) {
        return this.pool.pop()
    }
    else {
        return false
    }
};

Pool.prototype.put = function(obj) {
    this.pool.unshift(obj)
};
