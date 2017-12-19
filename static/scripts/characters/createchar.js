function loadCharSheetCanvas() {
    var currentlayer;
    var currentproperties;
    var selectedSprite = allSpritesXL[0][0];
    var avatar = new AvatarSprite();
    avatar.base = selectedSprite;

    var pickercanvas = document.getElementById("tilepicker");
    var pickerctx = pickercanvas.getContext("2d");
    pickercanvas.width = 918;
    pickercanvas.height = 203;

    // var base = document.getElementById("base");
    var charcanvas = document.getElementById("charcanvas");
    var tilectx = charcanvas.getContext("2d");
    
    //Draw all sprites by all charsprites
    for (let x = 0; x < allSprites.length; x++) {
        for (let y = 0; y < allSprites[x].length; y++) {
            let Csprite = allSprites[x][y];
            Csprite.x = x * (Csprite.w + 1) + 1;
            Csprite.y = y * (Csprite.h + 1) + 1;
            Csprite.render(pickerctx);
        }
    }
    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new AvatarSprite();
        tilectx.clearRect(0, 0, charcanvas.width, charcanvas.height)
        avatar.makeAvatar(tilectx, 0, 0, charcanvas.width, charcanvas.height)
    })
    pickercanvas.addEventListener('mousedown', function (e) {
        if (e.which == 1) {
            pickTile(e)//"left", pickercanvas, e);
            // setFetch(false);
        }
    });
    function pickTile(e) {//click, canvas, e) {
        // if (canvas == pickercanvas) {
        // findOffset();
        pickerRect = pickercanvas.getBoundingClientRect()
        // console.log(`Picker:[${pickerRect.left},${pickerRect.top}]`);
        // console.log(`Page= x:${e.pageX},y:${e.pageY}`)
        let clickX = Math.floor(e.pageX) - Math.floor(pickerRect.left);
        let clickY = Math.floor(e.pageY) - Math.floor(pickerRect.top);
        // console.log(`Click= x:${clickX} y:${clickY}`)
        // console.log(`Array= x:${Math.floor(clickX/17)} y:${Math.floor(clickY/17)}`)
        
        let tileX = Math.floor(clickX / 17);
        let tileY = Math.floor(clickY / 17);
        console.log(`Layer= x:${e.layerX},y:${e.layerY}`)
        
        // console.log(`row:${tileX} column:${tileY}`)

        //Filter selection's layer
        //Bases: [0->3,0->1]
        if(tileX<2 && tileY<4){
            avatar.base = allSpritesXL[tileX][tileY];
            avatar.base.x = 0;
            avatar.base.y = 0;
        }
        else if((tileX==3)&&(tileY<4 || (tileY>4 && tileY<9))){//Pants: [3,0->3 & 5->8]
            avatar.pants = allSpritesXL[tileX][tileY];
            avatar.pants.x = 0;
            avatar.pants.y = 0;
        }
        else if (((tileX == 3) && (tileY == 4 || tileY == 9))||(tileX==4 &&tileY<10)){//Boots:[3,4/9] || [4,0->9]
            avatar.boots = allSpritesXL[tileX][tileY];
            avatar.boots.x = 0;
            avatar.boots.y = 0;
        }
        else if ((tileX > 5 && tileX < 18) && (tileY < 10)) {//torso [6->17,0->9]
            avatar.torso = allSpritesXL[tileX][tileY];
            avatar.torso.x = 0;
            avatar.torso.y = 0;
        }//torso
        else if ((tileX > 18 && tileX < 23) && tileY >7) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            //beard [,3/7] || [,10]
            if (tileY == 10) {
                avatar.beard = allSpritesXL[tileX][tileY];
                avatar.beard.x = 0;
                avatar.beard.y = 0;
            } else {
                avatar.hair = allSpritesXL[tileX][tileY];
                avatar.hair.x = 0;
                avatar.hair.y = 0;
            }
        }//hair
        else if ((tileX > 18 && tileX < 27) && tileY<8){//(()&&())||((tileX>18 && tileX<23)&&(tileY>7&&tileY<11))) {
            //hair [19->26,0->2&&4-6] || [19->22,8-10]
            if (tileY == 3 || tileY ==7){
                avatar.beard = allSpritesXL[tileX][tileY];
                avatar.beard.x = 0;
                avatar.beard.y = 0;
            }else{
                avatar.hair = allSpritesXL[tileX][tileY];
                avatar.hair.x = 0;
                avatar.hair.y = 0;
            }
        }//hair
        else if ((tileX > 27 && tileX < 32) && (tileY < 9)){//hat [28->31,0-8]
            avatar.hat = allSpritesXL[tileX][tileY];
            avatar.hat.x = 0;
            avatar.hat.y = 0;
        }
        else if ((tileX > 32 && tileX < 41)&& (tileY < 9)) {//left [33-40,0-8]
            avatar.left = allSpritesXL[tileX][tileY];
            avatar.left.x = 0;
            avatar.left.y = 0;
        }//left
        else if ((tileX > 41 && tileX < 52) && (tileY < 10)) {//right [42-51,0-9]
            avatar.right = allSpritesXL[tileX][tileY];
            avatar.right.x = 0;
            avatar.right.y = 0;
        }
        else if ((tileX > 51 && tileX < 54) && (tileY < 5)){
            avatar.left = undefined;
            // tilectx = left.getContext("2d");
            // tilectx.clearRect(0, 0, 16, 16);
            avatar.right = allSpritesXL[tileX][tileY];
            avatar.right.x = 0;
            avatar.right.y = 0;
        }
        //Draw new Avatar
        console.log(avatar)
        // let ctx = charcanvas.getContext("2d");
        tilectx.clearRect(0, 0, charcanvas.width, charcanvas.height)
        avatar.makeAvatar(tilectx, 0, 0, allSpritesXL[0][0].w, allSpritesXL[0][0].h)
    }
}