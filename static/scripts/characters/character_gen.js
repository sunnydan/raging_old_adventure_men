// var selectLayer;
var drawRoom;

function loadCharSheetCanvas() {
    var currentlayer;
    var currentproperties;

    var avatar = new Avatar();
    console.log(avatar)
    
    var charcanvas = document.getElementById("charcanvas");
    var tilectx = charcanvas.getContext("2d");
    avatar.avatarSprite.makeAvatar(tilectx);

    // let hidden = document.getElementById("allSprites");
    // console.log(JSON.stringify(allSprites));
    document.getElementById("allSprites").value = JSON.stringify(avatar);

    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new Avatar();
        //change all dropdowns and inputs to undefined
    })

    // OPTIONS:
    //1)
        //Add listeners for each dropdown--on change?
        //add change to saved avatar AND to image
            //avatar property changes AND set[]Layer() is called
    //2)
        //Take all dropdowns and create a new Avatar with values


}