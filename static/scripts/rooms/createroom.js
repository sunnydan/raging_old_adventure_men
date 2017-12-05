var selectLayer;
var drawRoom;

function loadSpriteSheetCanvas() {
    var room = new Room();
    var currentlayer;
    var currentproperties;
    var selectedSprite = allSprites[0][0];
    var selectedSprite2 = allSprites[5][0];
    var fetchmode = false;

    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 971;
    pickercanvas.height = 1311;

    var tilecanvas = document.getElementById("selectedtile");
    var tilectx = tilecanvas.getContext("2d");
    selectedSprite.drawImage(tilectx, 0, 0);

    var tilecanvas2 = document.getElementById("selectedtile2");
    var tilectx2 = tilecanvas2.getContext("2d");;
    selectedSprite2.drawImage(tilectx2, 0, 0);

    var roomcanvas = document.getElementById("roomcanvas");
    var roomctx = roomcanvas.getContext("2d");

    var fetchbtn = document.getElementById("fetchbtn");
    var clearbtn = document.getElementById("clearbtn");
    var fillbtn = document.getElementById("fillbtn");
    var undobtn = document.getElementById("undobtn");
    var redobtn = document.getElementById("redobtn");

    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            Csprite = allSprites[x][y];
            Csprite.drawImage(pickerctx, x * (Csprite.width + 1) + 1, y * (Csprite.height + 1) + 1, Csprite.width, Csprite.height);
        }
    }

    window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 70: //F
                setFetch(true);
                break;
            case 16: //shift
                break;
            case 17: //ctrl
                break;
        }
    });

    window.addEventListener('keyup', function (e) {
        switch (e.keyCode) {
            case 70: //F
                setFetch(false);
                break;
            case 16: //shift
                break;
            case 17: //ctrl
                break;
        }
    });

    var mousedown = false;
    var downevent;
    var undoredo = new UndoRedo();

    roomcanvas.addEventListener('mousemove', function (e) { //MOUSE MOVE HANDLER
        if (mousedown) {
            if (downevent.which == 1) {

            } else if (downevent.which == 3) {
                
            }
        }
    });

    roomcanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            if (fetchmode) {
                pickTile("left", roomcanvas, e);
            } else if (currentlayer != "preview") {
                mousedown = true;
                downevent = e;
            }
        }
    });

    roomcanvas.oncontextmenu = function (e) {
        if (fetchmode) {
            pickTile("right", roomcanvas, e);
        } else if (currentlayer != "preview") {
            mousedown = true;
            downevent = e;
        }
        return false;
    }

    roomcanvas.addEventListener("mouseup", function (e) {
        mousedown = false;
        undoredo.getOld(room);
        undoredo.useNew(room);
        let newundoredo = new UndoRedo();
        newundoredo.setNext(undoredo);
        undoredo = newundoredo;
    });

    function paintTile(sprite, tileX, tileY) {
        let tile = new Tile(sprite, null);
        room.setTile(tile, tileX, tileY, currentlayer);
    }

    pickercanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            pickTile("left", pickercanvas, e);
            setFetch(false);
        }
    });

    pickercanvas.oncontextmenu = function (e) {
        pickTile("right", pickercanvas, e);
        setFetch(false);
        return false;
    }

    function pickTile(click, canvas, e) {
        if (canvas == pickercanvas) {
            var tileX = Math.floor(e.layerX / 17);
            var tileY = Math.floor(e.layerY / 17);
            if (click == "left") {
                tilectx.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
                selectedSprite = allSprites[tileX][tileY];
                selectedSprite.drawImage(tilectx, 0, 0);
            } else {
                tilectx2.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
                selectedSprite2 = allSprites[tileX][tileY];
                selectedSprite2.drawImage(tilectx2, 0, 0);
            }
        } else {
            var tileX = Math.floor(e.layerX / 16);
            var tileY = Math.floor(e.layerY / 16);
            if (click == "left") {
                tilectx.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
                selectedSprite = room.tiles[tileX][tileY][currentlayer].sprite;
                selectedSprite.drawImage(tilectx, 0, 0);
            } else {
                tilectx2.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
                selectedSprite2 = room.tiles[tileX][tileY][currentlayer].sprite;
                selectedSprite2.drawImage(tilectx2, 0, 0);
            }
        }
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
                let j = i + 1
                console.log(j);
                document.getElementById("layer" + j).disabled = false;
            }
        }
        drawRoom();
    }
    selectLayer(0);

    fetchbtn.addEventListener('mousedown', function (e) {
        setFetch(!fetchmode);
    });

    function setFetch(state) {
        fetchmode = state;
        if (!fetchmode) {
            fetchbtn.setAttribute("style", "color: black;");
        } else {
            fetchbtn.setAttribute("style", "color: grey;");
        }
    }
}