function runGame() {
    var canvas = document.getElementById("gamecanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 1024;

    rooms[0].drawRoom(ctx);
}