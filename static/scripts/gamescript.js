window.onload = () => {
    // A cross-browser requestAnimationFrame
    // See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
    var requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    var canvas = document.getElementById("gamecanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;
    document.body.appendChild(canvas);

    var imageObj = new Image();

    imageObj.onload = () => {
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                ctx.drawImage(imageObj, i* 17, j*17, 16, 16, i*16, j*16, 16, 16);
            }
        }
    }

    imageObj.src = "/resources/sprites/tiles/roguelikeSheet_transparent.png";

}