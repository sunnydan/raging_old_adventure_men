function loadSpriteSheetCanvas() {
    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 971;
    pickercanvas.height = 1311;

    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            Csprite = allSprites[x][y];
            Csprite.drawImage(pickerctx, x * (Csprite.width + 1) + 1, y * (Csprite.height + 1) + 1, Csprite.width, Csprite.height);
        }
    }

    var tilecanvas = document.getElementById("selectedtile");
    var tilectx = tilecanvas.getContext("2d");;
    var selectedSprite = allSprites[0][0];
    selectedSprite.drawImage(tilectx, 0, 0);

    pickercanvas.addEventListener('mousedown', function (e) {
        console.log("newpick");
        var tileX = Math.floor(e.layerX / 17);
        var tileY = Math.floor(e.layerY / 17);
        console.log(tileX, tileY);
        tilectx.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
        selectedSprite = allSprites[tileX][tileY];
        selectedSprite.drawImage(tilectx, 0, 0);
    });

    var roomcanvas = document.getElementById("roomcanvas");
    var roomctx = roomcanvas.getContext("2d");

    roomcanvas.addEventListener('mousedown', function (e) {
        var tileX = Math.floor(e.layerX / 16);
        var tileY = Math.floor(e.layerY / 16);
        roomctx.clearRect(tileX*16, tileY*16, 16, 16);
        selectedSprite.drawImage(roomctx, tileX*16, tileY*16);
    });
}