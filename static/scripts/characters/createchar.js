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

    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new AvatarSprite();
    })

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
        // console.log(`x:${e.layerX},y:${e.layerY}`)
        console.log(`row:${tileX} column:${tileY}`)

        //Filter selection's layer
        //Bases: [0->3,0->1]
        console.log("Is torso?", (tileX > 5 && tileX < 18) && (tileY < 10))
        if(tileX<2 && tileY<4){
            console.log("Base layer")
            avatar.base = allSprites[tileX][tileY];
            tilectx = base.getContext("2d");
            tilectx.clearRect(0, 0, 16,16)
            avatar.base.drawImage(tilectx, 0, 0);
        }
        else if((tileX==3)&&(tileY<4 || (tileY>4 && tileY<9))){//Pants: [3,0->3 & 5->8]
            avatar.pants = allSprites[tileX][tileY];
            tilectx = pants.getContext("2d");
            tilectx.clearRect(0, 0, 16,16)
            avatar.pants.drawImage(tilectx, 0, 0);
        }
        else if (((tileX == 3) && (tileY == 4 || tileY == 9))||(tileX==4 &&tileY<10)){//Boots:[3,4/9] || [4,0->9]
            avatar.boots = allSprites[tileX][tileY];
            tilectx = boots.getContext("2d");
            tilectx.clearRect(0, 0, 16,16)
            avatar.boots.drawImage(tilectx, 0, 0);
        }
        else if ((tileX > 5 && tileX < 18) && (tileY < 10)) {//torso [6->17,0->9]
            avatar.torso = allSprites[tileX][tileY];
            tilectx = torso.getContext("2d");
            tilectx.clearRect(0, 0, 16,16)
            avatar.torso.drawImage(tilectx, 0, 0);
        }//torso
        else if ((tileX > 18 && tileX < 23) && tileY >7) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            //beard [,3/7] || [,10]
            if (tileY == 10) {
                avatar.beard = allSprites[tileX][tileY];
                tilectx = beard.getContext("2d");
                tilectx.clearRect(0, 0, 16,16);
                avatar.beard.drawImage(tilectx, 0, 0);
            } else {
                avatar.hair = allSprites[tileX][tileY];
                tilectx = hair.getContext("2d");
                tilectx.clearRect(0, 0, 16,16);
                avatar.hair.drawImage(tilectx, 0, 0);
            }
        }//hair
        else if ((tileX > 18 && tileX < 27) && tileY<8){//(()&&())||((tileX>18 && tileX<23)&&(tileY>7&&tileY<11))) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            if (tileY == 3 || tileY ==7){
                avatar.beard = allSprites[tileX][tileY];
                tilectx = beard.getContext("2d");
                tilectx.clearRect(0, 0, 16,16);
                avatar.beard.drawImage(tilectx, 0, 0);
            }else{
                avatar.hair = allSprites[tileX][tileY];
                tilectx = hair.getContext("2d");
                tilectx.clearRect(0, 0, 16,16);
                avatar.hair.drawImage(tilectx, 0, 0);
            }
        }//hair
        else if ((tileX > 27 && tileX < 32) && (tileY < 9)){//hat [28->31,0-8]
            avatar.hat = allSprites[tileX][tileY];
            tilectx = hat.getContext("2d");
            tilectx.clearRect(0, 0, 16, 16);
            avatar.hat.drawImage(tilectx, 0, 0);
        }
        else if ((tileX > 32 && tileX < 41)&& (tileY < 9)) {//left [33-40,0-8]
            avatar.left = allSprites[tileX][tileY];
            tilectx = left.getContext("2d");
            tilectx.clearRect(0, 0, 16, 16);
            avatar.left.drawImage(tilectx, 0, 0);
        }//left
        else if ((tileX > 41 && tileX < 52) && (tileY < 10)) {//right [42-51,0-9]
            avatar.right = allSprites[tileX][tileY];
            tilectx = right.getContext("2d");
            tilectx.clearRect(0, 0, 16, 16);
            avatar.right.drawImage(tilectx, 0, 0);
        }
        else if ((tileX > 51 && tileX < 54) && (tileY < 5)){
            avatar.left = undefined;
            tilectx = left.getContext("2d");
            tilectx.clearRect(0, 0, 16, 16);
            avatar.right = allSprites[tileX][tileY];
            tilectx = right.getContext("2d");
            tilectx.clearRect(0, 0, 16, 16);
            avatar.right.drawImage(tilectx, 0, 0);
        }
        //Draw new Avatar
        console.log(avatar)
        avatar.makeAvatar(charcanvas)
    }
}