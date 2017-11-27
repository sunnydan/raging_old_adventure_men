function runGame() {
    var canvas = document.getElementById("gamecanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 512;

    let CS = rogueSheet;
    for (let x = 0; x < CS.spritesacross; x++) {
        for (let y = 0; y < CS.spritesdown; y++) {
            let Csprite = CS.sprites[x][y];
            Csprite.drawImage(ctx, x * Csprite.width, y * Csprite.height, Csprite.width, Csprite.height);
        }
    }
}