var selectLayer;
var drawRoom;
var room;

function loadSpriteSheetCanvas() {
    room = new Room();
    var currentlayer;
    var currentproperties;
    var selectedSprite1 = allSprites[5][0];
    var selectedSprite2 = allSprites[22][11];
    var selectedSprite3 = allSprites[13][9];

    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 971;
    pickercanvas.height = 1311;

    var tilecanvas1 = document.getElementById("selectedtile1");
    var tilectx1 = tilecanvas1.getContext("2d");
    drawSprite(selectedSprite1, tilectx1, 0, 0);

    var tilecanvas2 = document.getElementById("selectedtile2");
    var tilectx2 = tilecanvas2.getContext("2d");
    drawSprite(selectedSprite2, tilectx2, 0, 0);

    var tilecanvas3 = document.getElementById("selectedtile3");
    var tilectx3 = tilecanvas3.getContext("2d");
    drawSprite(selectedSprite3, tilectx3, 0, 0);

    var roomcanvas = document.getElementById("roomcanvas");
    var roomctx = roomcanvas.getContext("2d");

    var fetchbtn = document.getElementById("fetchbtn");
    var resetbtn = document.getElementById("resetbtn");
    var fillbtn = document.getElementById("fillbtn");
    var undobtn = document.getElementById("undobtn");
    var redobtn = document.getElementById("redobtn");

    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            let Csprite = allSprites[x][y];
            drawSprite(Csprite, pickerctx, x * (Csprite.w + 1) + 1, y * (Csprite.h + 1) + 1);
        }
    }

    window.addEventListener('keydown', function (e) {
        switch (e.keyCode) {
            case 70: //F
                setFetch(true);
                break;
            case 89:
                if (e.ctrlKey) {
                    redo();
                }
                break;
            case 90:
                if (e.ctrlKey) {
                    undo();
                }
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
    var first = true;
    var undoredo = null;

    roomcanvas.oncontextmenu = function (e) {
        return false;
    }

    roomcanvas.addEventListener('mousedown', function (e) {
        if (fetchmode) {
            if (e.which == 1) {
                pickTile("left", roomcanvas, e);
            } else if (e.which == 2) {
                pickTile("middle", roomcanvas, e);
            } else if (e.which == 3) {
                pickTile("right", roomcanvas, e);
            }
        } else if (currentlayer != "preview") {
            newundoredo = new UndoRedo();
            newundoredo.setPrev(undoredo);
            undoredo = newundoredo;
            undoredo.layer = currentlayer;
            var tileX = Math.floor(e.layerX / 16);
            var tileY = Math.floor(e.layerY / 16);
            if (e.which == 1) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite1, currentproperties);
            } else if (e.which == 2) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite2, currentproperties);
            } else if (e.which == 3) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite3, currentproperties);
            }
            mousedown = true;
            downevent = e;
        }
    });

    roomcanvas.addEventListener('mousemove', function (e) { //MOUSE MOVE HANDLER
        if (mousedown) {
            var tileX = Math.floor(e.layerX / 16);
            var tileY = Math.floor(e.layerY / 16);
            if (downevent.which == 1) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite1, currentproperties);
            } else if (downevent.which == 2) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite2, currentproperties);
            } else if (downevent.which == 3) {
                undoredo.newtiles[tileX][tileY] = new Tile(selectedSprite3, currentproperties);
            }
            drawRoom();
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    if (undoredo.newtiles[x][y] != null) {
                        undoredo.newtiles[x][y].sprite.x = x * 16;
                        undoredo.newtiles[x][y].sprite.y = y * 16;
                        undoredo.newtiles[x][y].sprite.render(roomctx);
                    }
                }
            }
        }
    });

    roomcanvas.addEventListener("mouseup", function (e) {
        mousedown = false;
        if (downevent.shiftKey) {
            let OtileX = Math.floor(downevent.layerX / 16);
            let OtileY = Math.floor(downevent.layerY / 16);
            let UtileX = Math.floor(e.layerX / 16);
            let UtileY = Math.floor(e.layerY / 16);
            if (downevent.which == 1) {
                fillRect(OtileX, OtileY, UtileX, UtileY, selectedSprite1);
            } else if (downevent.which == 2) {
                fillRect(OtileX, OtileY, UtileX, UtileY, selectedSprite2);
            } else if (downevent.which == 3) {
                fillRect(OtileX, OtileY, UtileX, UtileY, selectedSprite3);
            }
        } else {
            undoredo.getOld(room);
            undoredo.useNew(room);
            setBtnEnabled(undobtn, true);
            setBtnEnabled(redobtn, false);
        }
        drawRoom();
    });

    pickercanvas.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (e.which == 1) {
            pickTile("left", pickercanvas, e);
        } else if (e.which == 2) {
            pickTile("middle", pickercanvas, e);
        } else if (e.which == 3) {
            pickTile("right", pickercanvas, e);

        }
        setFetch(false);
    });

    pickercanvas.oncontextmenu = function (e) {
        return false;
    }

    function pickTile(click, canvas, e) {
        if (canvas == pickercanvas) {
            pickerRect = pickercanvas.getBoundingClientRect()
            // console.log(`Picker:[${pickerRect.left},${pickerRect.top}]`);
            // console.log(`Page= x:${e.pageX},y:${e.pageY}`)
            //subtract clicked page location with the start of the picker location
            let clickX = Math.floor(e.pageX) - Math.floor(pickerRect.left);
            let clickY = Math.floor(e.pageY) - Math.floor(pickerRect.top);
            let tileX = Math.floor(clickX / 17);
            let tileY = Math.floor(clickY / 17);
            if (click == "left") {
                tilectx1.clearRect(0, 0, 16, 16);
                selectedSprite1 = allSprites[tileX][tileY];
                drawSprite(selectedSprite1, tilectx1, 0, 0);
                tilecanvas1.setAttribute("title", "" + tileX + ", " + tileY);
            } else if (click == "middle") {
                tilectx2.clearRect(0, 0, 16, 16);
                selectedSprite2 = allSprites[tileX][tileY];
                drawSprite(selectedSprite2, tilectx2, 0, 0);
                tilecanvas2.setAttribute("title", "" + tileX + ", " + tileY);
            } else {
                tilectx3.clearRect(0, 0, 16, 16);
                selectedSprite3 = allSprites[tileX][tileY];
                drawSprite(selectedSprite3, tilectx3, 0, 0);
                tilecanvas3.setAttribute("title", "" + tileX + ", " + tileY);
            }
        } else {
            var tileX = Math.floor(e.layerX / 16);
            var tileY = Math.floor(e.layerY / 16);
            if (click == "left") {
                tilectx1.clearRect(0, 0, 16, 16);
                selectedSprite1 = room.tiles[tileX][tileY][currentlayer].sprite;
                drawSprite(selectedSprite1, tilectx1, 0, 0);
                tilecanvas1.setAttribute("");
            } else if (click == "middle") {
                tilectx2.clearRect(0, 0, 16, 16);
                selectedSprite2 = room.tiles[tileX][tileY][currentlayer].sprite;
                drawSprite(selectedSprite2, tilectx2, 0, 0);
                tilecanvas2.setAttribute("");
            } else {
                tilectx3.clearRect(0, 0, 16, 16);
                selectedSprite3 = room.tiles[tileX][tileY][currentlayer].sprite;
                drawSprite(selectedSprite3, tilectx3, 0, 0);
                tilecanvas3.setAttribute("");
            }
        }
    }

    drawRoom = () => {
        roomctx.clearRect(0, 0, 256, 256);
        if (currentlayer == "preview") {
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    for (let z = 0; z < 4; z++) {
                        drawSprite(room.tiles[x][y][z].sprite, roomctx, x * 16, y * 16);
                    }
                }
            }
        }
        else {
            for (let x = 0; x < 16; x++) {
                for (let y = 0; y < 16; y++) {
                    for (let z = 0; z <= currentlayer; z++) {
                        if (z < currentlayer) {
                            roomctx.globalAlpha = 1 / (4 - z);
                        } else {
                            roomctx.globalAlpha = 1;
                        }
                        drawSprite(room.tiles[x][y][z].sprite, roomctx, x*16, y*16);
                    }
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
                document.getElementById("layer" + j).disabled = false;
            }
        }
        drawRoom();
    }
    selectLayer(0);

    var fetchmode = false;
    fetchbtn.addEventListener('mousedown', function (e) {
        setFetch(!fetchmode);
    });

    function setFetch(state) {
        fetchmode = state;
        if (fetchmode) {
            fetchbtn.setAttribute("style", "color: grey;");
        } else {
            fetchbtn.setAttribute("style", "color: black;");
        }
    }

    if (!undoredo || undoredo.prev == null) {
        setBtnEnabled(undobtn, false);
    }

    undobtn.addEventListener('click', function (e) {
        undo();
    });

    function undo() {
        if (getBtnEnabled(undobtn)) {
            undoredo.useOld(room);
            undoredo = undoredo.prev;
            undoredo.useNew(room);
            if (!undoredo.prev) {
                setBtnEnabled(undobtn, false);
            }
            setBtnEnabled(redobtn, true);
        }
    }

    if (!undoredo || undoredo.next == null) {
        setBtnEnabled(redobtn, false);
    }

    redobtn.addEventListener('click', function (e) {
        redo();
    });

    function redo() {
        if (getBtnEnabled(redobtn)) {
            undoredo = undoredo.next;
            undoredo.useNew(room);
            if (!undoredo.next) {
                setBtnEnabled(redobtn, false);
            }
            setBtnEnabled(undobtn, true);
        }
    }

    function fillRect(x1, y1, x2, y2, sprite) {
        if (x2 < x1) {
            let t = x1;
            x1 = x2;
            x2 = t;
        }
        if (y2 < y1) {
            let t = y1;
            y1 = y2;
            y2 = 1;
        }
        newundoredo = new UndoRedo();
        newundoredo.setPrev(undoredo);
        undoredo = newundoredo;
        undoredo.layer = currentlayer;
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                undoredo.newtiles[x][y] = new Tile(sprite, currentproperties);
            }
        }
        undoredo.getOld(room);
        undoredo.useNew(room);
        setBtnEnabled(undobtn, true);
        setBtnEnabled(redobtn, false);
        drawRoom();
    }

    resetbtn.addEventListener("click", function (e) {
        for (z = 0; z < 4; z++) {
            currentlayer = z;
            fillRect(0, 0, 15, 15, rogueSheet.sprites[0][5]);
        }
    });

    fillbtn.oncontextmenu = function (e) {
        return false;
    }

    fillbtn.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            fillRect(0, 0, 15, 15, selectedSprite1);
        } else if (e.which == 2) {
            fillRect(0, 0, 15, 15, selectedSprite2);
        } else if (e.which == 3) {
            fillRect(0, 0, 15, 15, selectedSprite3);
        }
    });
}

function getBtnEnabled(btn) {
    return !btn.disabled;
}

function setBtnEnabled(btn, enabled) {
    btn.disabled = !enabled;
}

function drawSprite(sprite, ctx, x, y) {
    sprite.x = x;
    sprite.y = y;
    sprite.render(ctx);
}