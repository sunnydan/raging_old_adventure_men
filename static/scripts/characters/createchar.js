// var selectLayer;
var drawRoom;

function loadCharSheetCanvas() {
    var currentlayer;
    var currentproperties;
    var selectedSprite = allSprites[0][0];
    var avatar = new AvatarSprite();
    avatar.base = selectedSprite;

    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 971;
    pickercanvas.height = 203;

    var base = document.getElementById("base");
    var tilectx = base.getContext("2d");
    selectedSprite.drawImage(tilectx, 0, 0, 16, 16);

    var hair = document.getElementById("hair");
    var hat = document.getElementById("hat");
    var beard = document.getElementById("beard");
    var pants = document.getElementById("pants");
    var boots = document.getElementById("boots");
    var torso = document.getElementById("torso");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var charcanvas = document.getElementById("charcanvas");

    var makeAvatar;

    // pickerctx.drawImage(Charsheet.imageObj,0,0)
    //Draw all sprites by all charsprites
    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            let Csprite = allSprites[x][y];
            Csprite.drawImage(pickerctx, x * (Csprite.width + 1) + 1, y * (Csprite.height + 1) + 1, Csprite.width, Csprite.height);
        }
    }
    //Listen for a specific layer's click
        //Base
        base.addEventListener('mousedown', function (e) {
            tilectx = base.getContext("2d")
        })
        //Hair
        hair.addEventListener('mousedown', function (e) {
            tilectx = hair.getContext("2d")
        })
        //hat
        hat.addEventListener('mousedown', function (e) {
            tilectx = hat.getContext("2d")
        })
        //Beard
        beard.addEventListener('mousedown', function (e) {
            tilectx = beard.getContext("2d")
        })
        //Pants
        pants.addEventListener('mousedown', function (e) {
            tilectx = pants.getContext("2d")
        })
        //Boots
        boots.addEventListener('mousedown', function (e) {
            tilectx = boots.getContext("2d")
        })
        //Torso
        torso.addEventListener('mousedown', function (e) {
            tilectx = torso.getContext("2d")
        })
        //Left
        left.addEventListener('mousedown', function (e) {
            tilectx = left.getContext("2d")
        })
        //Right
        right.addEventListener('mousedown', function (e) {
            tilectx = right.getContext("2d")
        })

    //using sprites from different layers, draw image in charcanvas
    function makeAvatar() {
        var ctx = charcanvas.getContext("2d");
        ctx.clearRect(0, 0, charcanvas.width, charcanvas.height)
        if(avatar.base) avatar.base.drawImage(ctx,0, 0);
        if(avatar.pants) avatar.pants.drawImage(ctx, 0, 0);
        if(avatar.boots) avatar.boots.drawImage(ctx, 0, 0)
        if(avatar.torso) avatar.torso.drawImage(ctx, 0, 0);
        if (avatar.hair) avatar.hair.drawImage(ctx, 0, 0);
        if (avatar.hat) avatar.hat.drawImage(ctx, 0, 0);
        if(avatar.beard) avatar.beard.drawImage(ctx, 0, 0);
        if(avatar.left) avatar.left.drawImage(ctx,0, 0);
        if(avatar.right) avatar.right.drawImage(ctx, 0, 0);
    }

    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new AvatarSprite();
    })

    // function paintTile(sprite, tileX, tileY) {
    //     let tile = new Tile(sprite, null);
    //     room.setTile(tile, tileX, tileY, currentlayer);
    // }

    pickercanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            pickTile(e)//"left", pickercanvas, e);
            // setFetch(false);
        }
    });
    function pickTile(e) {//click, canvas, e) {
        // if (canvas == pickercanvas) {
        var tileX = Math.floor((e.layerX) / 17);
        var tileY = Math.floor(e.layerY / 17);
        console.log(`x:${e.layerX},y:${e.layerY}`)
        console.log(`row:${tileX} column:${tileY}`)
        
        //old method
        // selectedSprite = allSprites[tileX][tileY];
        // selectedSprite.drawImage(tilectx, 0, 0);
        
        //Filter selection's layer
        //Bases: [0->3,0->1]
        if(tileX<2 && tileY<4){
            console.log("Base layer")
            avatar.base = allSprites[tileX][tileY];
            tilectx = base.getContext("2d")
            avatar.base.drawImage(tilectx, 0, 0);
        }
        else if((tileX==3)&&(tileY<4 || (tileY>4 && tileY<9))){//Pants: [3,0->3 & 5->8]
            avatar.pants = allSprites[tileX][tileY];
            tilectx = pants.getContext("2d")
            avatar.pants.drawImage(tilectx, 0, 0);
        }
        else if (((tileX == 3) && (tileY == 4 || tileY == 9))||(tileX==4 &&tileY<10)){//Boots:[3,4/9] || [4,0->9]
            avatar.boots = allSprites[tileX][tileY];
            tilectx = boots.getContext("2d")
            avatar.boots.drawImage(tilectx, 0, 0);
        }
        else if ((tileX>5 && tileX<18)||(tileY<10)) {//torso [6->17,0->9]
            avatar.torso = allSprites[tileX][tileY];
            tilectx = torso.getContext("2d")
            avatar.torso.drawImage(tilectx, 0, 0);
        }//torso
        else if ((tileX > 18 && tileX < 23) && tileY >7) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            //beard [,3/7] || [,10]
            if (tileY == 10) {
                avatar.beard = allSprites[tileX][tileY];
                tilectx = beard.getContext("2d")
                avatar.beard.drawImage(tilectx, 0, 0);
            } else {
                avatar.hair = allSprites[tileX][tileY];
                tilectx = hair.getContext("2d")
                avatar.hair.drawImage(tilectx, 0, 0);
            }
        }//hair
        else if ((tileX > 18 && tileX < 27) && tileY<8){//(()&&())||((tileX>18 && tileX<23)&&(tileY>7&&tileY<11))) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            if(tileY==3,7){
                avatar.beard = allSprites[tileX][tileY];
                tilectx = beard.getContext("2d")
                avatar.beard.drawImage(tilectx, 0, 0);
            }else{
                avatar.hair = allSprites[tileX][tileY];
                tilectx = hair.getContext("2d")
                avatar.hair.drawImage(tilectx, 0, 0);
            }
        }//hair
        //hat
        //beard [,3/7] || [,10]
        //left
        //right
        //Draw new Avatar
        // console.log(avatar)
        makeAvatar()
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