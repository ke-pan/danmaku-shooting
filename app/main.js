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
