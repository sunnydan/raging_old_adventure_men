var selectLayer;
var drawRoom;

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
    var tilectx = tilecanvas.getContext("2d");
    var selectedSprite = allSprites[0][0];
    selectedSprite.drawImage(tilectx, 0, 0);

    var tilecanvas2 = document.getElementById("selectedtile2");
    var tilectx2 = tilecanvas2.getContext("2d");;
    var selectedSprite2 = allSprites[5][0];
    selectedSprite2.drawImage(tilectx2, 0, 0);

    pickercanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            var tileX = Math.floor(e.layerX / 17);
            var tileY = Math.floor(e.layerY / 17);
            console.log(tileX, tileY);
            tilectx.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
            selectedSprite = allSprites[tileX][tileY];
            selectedSprite.drawImage(tilectx, 0, 0);
        }
    });

    pickercanvas.oncontextmenu = function (e) {
        var tileX = Math.floor(e.layerX / 17);
        var tileY = Math.floor(e.layerY / 17);
        console.log(tileX, tileY);
        tilectx2.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
        selectedSprite2 = allSprites[tileX][tileY];
        selectedSprite2.drawImage(tilectx2, 0, 0);
        return false;
    }

    var room = new Room();
    var roomcanvas = document.getElementById("roomcanvas");
    var roomctx = roomcanvas.getContext("2d");

    roomcanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            if (currentlayer != "preview") {
                let tileX = Math.floor(e.layerX / 16);
                let tileY = Math.floor(e.layerY / 16);
                let tile = new Tile(selectedSprite, null);
                room.setTile(tile, tileX, tileY, currentlayer);
            }
        }
    });

    roomcanvas.oncontextmenu = function (e) {
        if (currentlayer != "preview") {
            let tileX = Math.floor(e.layerX / 16);
            let tileY = Math.floor(e.layerY / 16);
            let tile = new Tile(selectedSprite2, null);
            room.setTile(tile, tileX, tileY, currentlayer);
        }
        return false;
    }

    drawRoom = () => {
        roomctx.clearRect(0, 0, 256, 256);
        if (currentlayer == "preview") {
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    for (let z = 0; z < 4; z++) {
                        room.tiles[x][y][z].sprite.drawImage(roomctx, x * 16, y * 16)
                    }
                }
            }
        }
        else {
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    let ti = room.tiles[x][y][currentlayer];
                    ti.sprite.drawImage(roomctx, x * 16, y * 16);
                }
            }
        }
    }

    var currentlayer;
    selectLayer = (layer) => {
        if (layer != 'preview') {
            document.getElementById("layerpreview").disabled = false;
            let l = layer + 1;
            document.getElementById("layer" + l).disabled = true;
        } else {
            document.getElementById("layer" + layer).disabled = true;
        }
        
        currentlayer = layer;
        for (let i = 0; i < 4; i++) {
            if (i != layer) {
                let j = i+1
                console.log(j);
                document.getElementById("layer" + j).disabled = false;
            }
        }
        drawRoom();
    }
    selectLayer(0);

    var currentproperties;

}