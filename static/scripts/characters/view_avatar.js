// var selectLayer;
var drawRoom;

function loadCharSheetCanvas() {
    var currentlayer;
    var currentproperties;

    var input = JSON.parse(document.getElementById("avatar").value)
    if(input) {
        console.log(input)
        document.getElementById("reason").innerHTML = input.reason;
        var avatar = new Avatar(input.race, input.gender, input.hair_style,input.hair_color,input.beard)
        console.log(avatar)
        var charcanvas = document.getElementById("charcanvas");
        var tilectx = charcanvas.getContext("2d");
        avatar.avatarSprite.makeAvatar(tilectx);
    }
    else{
        console.log("No Avatar")
    }

}