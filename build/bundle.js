/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var words = [{
	    content: '23333',
	    stime: 10.12,
	    size: '24',
	    color: 16777215
	}, {
	    content: '66666',
	    stime: 0.123,
	    size: '24',
	    color: 16777215
	}]

	var Pool = __webpack_require__(1)
	var Bullet = __webpack_require__(2)
	var Danmaku = __webpack_require__(3)
	var DanmakuController = __webpack_require__(4)
	var Ship = __webpack_require__(5)

	var video = document.getElementById('video')
	var danmakuCanvas = document.getElementById('main')
	var danmakuCtx = danmakuCanvas.getContext('2d')
	var bulletCtx = danmakuCtx
	var shipCanvas = document.getElementById('ship')
	var shipCtx = shipCanvas.getContext('2d')

	var bulletImage = new Image(12, 12)
	var bulletPool = new Pool(20, Bullet, bulletCtx, bulletImage)
	Ship.prototype.bullets = bulletPool
	var shipImage = new Image(24, 24)
	var ship = new Ship(shipImage, shipCtx)
	DanmakuController.prototype.pool = new Pool(100, Danmaku, danmakuCtx)
	var danmakuController = new DanmakuController(words, 5, danmakuCanvas.width);


	shipImage.onload = function() {
	    ship.init(10, 100)
	    ship.act()
	}
	bulletImage.src = './app/images/bullet.png'
	shipImage.src = './app/images/ship.png'

	video.addEventListener('timeupdate', function() {
	    danmakuController.load.call(danmakuController, video.currentTime)
	}, false);

	KEY_CODES = {
	    32: 'space',
	    37: 'left',
	    38: 'up',
	    39: 'right',
	    40: 'down',
	}

	KEY_STATUS = {};
	for (code in KEY_CODES) {
	    KEY_STATUS[KEY_CODES[code]] = false;
	}

	document.onkeydown = function(e) {
	    // Firefox and opera use charCode instead of keyCode to
	    // return which key was pressed.
	    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	    if (KEY_CODES[keyCode]) {
	        e.preventDefault();
	        KEY_STATUS[KEY_CODES[keyCode]] = true;
	    }
	}

	document.onkeyup = function(e) {
	    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
	    if (KEY_CODES[keyCode]) {
	        e.preventDefault();
	        KEY_STATUS[KEY_CODES[keyCode]] = false;
	    }
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

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

	module.exports = Pool


/***/ },
/* 2 */
/***/ function(module, exports) {

	function Bullet(context, image) {
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

	module.exports = Bullet


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	    this.word = word
	    this.font = word.size + 'px sans-serif'
	    this.context.font = this.font
	    this.width = this.context.measureText(word.content).width
	    this.height = parseInt(word.size) + 1
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

	    if (this.alive) {
	        requestAnimationFrame(this.fly.bind(this))
	    }

	}

	module.exports = Danmaku


/***/ },
/* 4 */
/***/ function(module, exports) {

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


	module.exports = DanmakuController


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Ship(image, context) {
	    this.image = image
	    this.context = context
	    this.width = image.width
	    this.height = image.height
	    this.speed = 3
	    this.shootRate = 12
	    this.counter = 0
	}

	Ship.prototype.init = function(x, y) {
	    this.x = x
	    this.y = y
	    this.draw()
	};

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
	    requestAnimationFrame(this.act.bind(this))
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

	module.exports = Ship


/***/ }
/******/ ]);