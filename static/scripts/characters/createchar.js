// var selectLayer;
var drawRoom;

function loadCharSheetCanvas() {
    var currentlayer;
    var currentproperties;
    var selectedSprite = allSprites[0][0];
    var fetchmode = false;

    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 971;
    pickercanvas.height = 203;

    var base = document.getElementById("base");
    var tilectx = base.getContext("2d");
    selectedSprite.drawImage(tilectx, 0, 0,16,16);

    var hair = document.getElementById("hair");
    var beard = document.getElementById("beard");
    var pants = document.getElementById("pants");
    var boots = document.getElementById("boots");
    var torso = document.getElementById("torso");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var charcanvas = document.getElementById("charcanvas");

    var makeAvatar;
    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            Csprite = allSprites[x][y];
            Csprite.drawImage(pickerctx, x * (Csprite.width + 1) + 1, y * (Csprite.height + 1) + 1, Csprite.width, Csprite.height);
        }
    }
    var mousedown = false;
    var downevent;
    // var undoredo = new UndoRedo();
    //Base
    base.addEventListener('mousedown',function(e){
        tilectx = base.getContext("2d")
    })
    //Hair
    hair.addEventListener('mousedown',function(e){
        tilectx = hair.getContext("2d")
    })
    //Beard
    beard.addEventListener('mousedown',function(e){
        tilectx = beard.getContext("2d")
    })
    //Pants
    pants.addEventListener('mousedown',function(e){
        tilectx = pants.getContext("2d")
    })
    //Boots
    boots.addEventListener('mousedown',function(e){
        tilectx = boots.getContext("2d")
    })
    //Torso
    torso.addEventListener('mousedown',function(e){
        tilectx = torso.getContext("2d")
    })
    //Left
    left.addEventListener('mousedown',function(e){
        tilectx = left.getContext("2d")
    })
    //Right
    right.addEventListener('mousedown',function(e){
        tilectx = right.getContext("2d")
    })

    function makeAvatar(){
        tilectx = charcanvas.getContext("2d");
        base.onload = function () {
            titlectx.drawImage(base, 0, 0);
            pants.onload = function () {
                titlectx.drawImage(pants, 0, 0);
                boots.onload = function () {
                    titlectx.drawImage(boots, 0, 0)
                    torso.onload = function () {
                        titlectx.drawImage(torso, 0, 0);
                        hair.onload = function () {
                            titlectx.drawImage(hair, 0, 0);
                        }
                    }
                    // var img = c.toDataURL("image/png");
                    // document.write('<img src="' + img + '" />');
                }

            }
        }
    }
    function paintTile(sprite, tileX, tileY) {
        let tile = new Tile(sprite, null);
        room.setTile(tile, tileX, tileY, currentlayer);
    }

    pickercanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            pickTile("left", pickercanvas, e);
            // setFetch(false);
        }
    });

    pickercanvas.oncontextmenu = function (e) {
        pickTile("right", pickercanvas, e);
        // setFetch(false);
        return false;
    }

    function pickTile(click, canvas, e) {
        if (canvas == pickercanvas) {
            var tileX = Math.floor((e.layerX) / 17);
            var tileY = Math.floor(e.layerY / 17);
            console.log(`x:${e.layerX},y:${e.layerY}`)
            if (click == "left") {
                tilectx.clearRect(0, 0, base.width, base.height);
                selectedSprite = allSprites[tileX][tileY];
                selectedSprite.drawImage(tilectx, 0, 0);
            } else {
                tilectx2.clearRect(0, 0, base.width, base.height);
                selectedSprite2 = allSprites[tileX][tileY];
                selectedSprite2.drawImage(tilectx2, 0, 0);
            }
        } else {
            var tileX = Math.floor(e.layerX / 16);
            var tileY = Math.floor(e.layerY / 16);
            if (click == "left") {
                tilectx.clearRect(0, 0, base.width, base.height);
                selectedSprite = room.tiles[tileX][tileY][currentlayer].sprite;
                selectedSprite.drawImage(tilectx, 0, 0);
            } else {
                tilectx2.clearRect(0, 0, tilecanvas.width, tilecanvas.height);
                selectedSprite2 = room.tiles[tileX][tileY][currentlayer].sprite;
                selectedSprite2.drawImage(tilectx2, 0, 0);
            }
        }
    }

    // drawRoom = () => {
    //     roomctx.clearRect(0, 0, 256, 256);
    //     if (currentlayer == "preview") {
    //         for (let x = 0; x < 16; x++) {
    //             for (let y = 0; y < 16; y++) {
    //                 for (let z = 0; z < 4; z++) {
    //                     room.tiles[x][y][z].sprite.drawImage(roomctx, x * 16, y * 16)
    //                 }
    //             }
    //         }
    //     }
    //     else {
    //         for (let x = 0; x < 16; x++) {
    //             for (let y = 0; y < 16; y++) {
    //                 let ti = room.tiles[x][y][currentlayer];
    //                 ti.sprite.drawImage(roomctx, x * 16, y * 16);
    //             }
    //         }
    //     }
    // }

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
    // selectLayer(0);

    // fetchbtn.addEventListener('mousedown', function (e) {
    //     setFetch(!fetchmode);
    // });

    // function setFetch(state) {
    //     fetchmode = state;
    //     if (!fetchmode) {
    //         fetchbtn.setAttribute("style", "color: black;");
    //     } else {
    //         fetchbtn.setAttribute("style", "color: grey;");
    //     }
    // }
}