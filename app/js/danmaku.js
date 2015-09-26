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

var flyingWordArrays = [
    [],
    [],
    [],
    []
];

var video = document.getElementById('video');
var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var x = canvas.width + 10;

words.sort(function(a, b) {
    return a.stime - b.stime;
});

function load() {
    while (words.length > 0 && words[0].stime < video.currentTime) {
        for (var j = 0; j < flyingWordArrays.length; j++) {
            if (flyingWordArrays[j].length == 0) {
                flyingWordArrays[j].push(words[0]);
                break;
            }
            var last = flyingWordArrays[j][flyingWordArrays[j].length - 1];
            if (last.x && last.x + last.width < canvas.width + 10) {
                flyingWordArrays[j].push(words[0]);
                break;
            }
        }
        words.shift();
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    flyingWordArrays.forEach(function(flyingWords, i) {
        flyingWords.forEach(function(e) {
            ctx.font = e.size + 'px serif';
            ctx.fillStyle = '#' + e.color.toString(16);
            if (e.x) {
                e.x = e.x - 3;
            }
            else {
                e.x = canvas.width + 10;
            }
            if (e.width === undefined) {
                e.width = ctx.measureText(e.content).width;
            }
            ctx.fillText(e.content, e.x, 24 + 30 * i);
        });
        if (flyingWords.length > 0 && flyingWords[0].x + flyingWords.width <
            0) {
            flyingWords.shift;
        }
    });
    requestAnimationFrame(draw);
}

video.addEventListener('timeupdate', load, false);



draw();
