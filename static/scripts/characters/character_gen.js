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

    var raceSelect = document.getElementById("race");
    var genderSelect = document.getElementById("gender");
    var styleSelect = document.getElementById("hair_style");
    var colorSelect = document.getElementById("hair_color");
    var beardSelect = document.getElementById("beard");

    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new Avatar();
        //change all dropdowns and inputs to undefined
        document.getElementById("race").selectedIndex="0";
        document.getElementById("gender").selectedIndex="0";
        document.getElementById("hair_style").selectedIndex="0";
        document.getElementById("hair_color").selectedIndex="0";
        document.getElementById("beard").selectedIndex="0";
        avatar.avatarSprite.makeAvatar(tilectx);
    })

    //Update saved data AND preview image after changing one of the basic Appearance of the avatar
    raceSelect.addEventListener('change', function (e) {
        console.log(typeof raceSelect)
        avatar.race = document.getElementById("race").value;
        avatar.setBaseLayer();
        avatar.avatarSprite.makeAvatar(tilectx);
        console.log("Change made, rewrite preview", avatar)
    })
    //gender
    genderSelect.addEventListener('change', function (e) {
        avatar.gender = document.getElementById("gender").value;
        avatar.setBaseLayer();
        avatar.avatarSprite.makeAvatar(tilectx);
        console.log("Change made, rewrite preview", avatar)
    })
    //style
    styleSelect.addEventListener('change', function (e) {
        avatar.hair_style = document.getElementById("hair_style").value;
        avatar.setHairLayer();
        avatar.avatarSprite.makeAvatar(tilectx);
        console.log("Change made, rewrite preview", avatar)
    })
    //color
    colorSelect.addEventListener('change', function (e) {
        avatar.hair_color = document.getElementById("hair_color").value;
        avatar.setHairLayer();
        avatar.setBeardLayer();
        avatar.avatarSprite.makeAvatar(tilectx);
        console.log("Change made, rewrite preview", avatar)
    })
    //beard
    beardSelect.addEventListener('change', function (e) {
        avatar.beard = document.getElementById("beard").value;
        if (avatar.beard.length==0){avatar.avatarSprite.beard=undefined;}
        else avatar.setBeardLayer(); 
        avatar.avatarSprite.makeAvatar(tilectx);
        console.log("Change made, rewrite preview", avatar)
    })
}