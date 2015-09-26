function Pool(num, constructor, context, image) {
    this.pool = []
    this.size = num

    for (var i = 0; i < num; i++) {
        this.pool[i] = new constructor(context, image)
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
