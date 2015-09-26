var video = document.getElementById('video')
var danmakuCanvas = document.getElementById('main')
var danmakuCtx = danmakuCanvas.getContext('2d')
var shipCanvas = document.getElementById('ship')
var shipCtx = shipCanvas.getContext('2d')

var shipImage = new Image(24, 24)
var ship = new Ship(shipImage, shipCtx)
shipImage.onload = function() {
    ship.init(10, 100)
    ship.act()
}
shipImage.src = './app/images/ship.png'



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
