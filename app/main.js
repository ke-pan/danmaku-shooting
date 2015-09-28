var words = require("./danmaku/danmaku.json")
var Pool = require("./js/pool")
var Bullet = require("./js/bullet")
var Danmaku = require("./js/danmaku")
var DanmakuController = require("./js/danmakuController")
var Ship = require("./js/ship")

var video = document.getElementById('video')
var danmakuCanvas = document.getElementById('main')
var danmakuCtx = danmakuCanvas.getContext('2d')
var bulletCtx = danmakuCtx
var shipCanvas = document.getElementById('ship')
var shipCtx = shipCanvas.getContext('2d')
var gameoverText = document.getElementById('gameover')

var bulletImage = new Image(12, 12)
var bulletPool = new Pool(30, Bullet, bulletCtx, bulletImage)
var shipImage = new Image(24, 24)
var ship = new Ship(shipImage, shipCtx)
var danmakuPool = new Pool(100, Danmaku, danmakuCtx)
var danmakuController = new DanmakuController(words, 12, danmakuCanvas.width);

ship.bullets = bulletPool
danmakuController.pool = danmakuPool
ship.collideWith = danmakuPool
Bullet.prototype.collideWith = danmakuPool

ship.gameover = function() {
    gameoverText.style.display = 'block'
}

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
