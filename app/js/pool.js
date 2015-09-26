function Pool(num, constructor) {
    this.pool = []
    this.size = num

    for (var i = 0; i < num; i++) {
        this.pool.push(new constructor())
    }
}

Pool.prototype.get = function() {
    if (this.pool[this.size - 1].alive) {
        return this.pool.pop()
    }
    else {
        return false
    }
};

Pool.prototype.put = function(obj) {
    this.pool.shift(obj)
};
