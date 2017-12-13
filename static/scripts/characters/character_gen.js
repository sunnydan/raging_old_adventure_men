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

    //clear Avatar
    var clearbtn = document.getElementById("clear");
    clearbtn.addEventListener('mousedown', function (e) {
        avatar = new Avatar();
        //change all dropdowns and inputs to undefined
    })

    //Update previe after every source
    raceSelect = document.getElementById("race");
    genderSelect = document.getElementById("gender");
    styleSelect = document.getElementById("hair_style");
    colorSelect = document.getElementById("hair_color");
    beardSelect = document.getElementById("beard");
    // console.log(document.getElementById("race").constructor.name);

    raceSelect.addEventListener('change', function (e) {
        console.log(typeof raceSelect)
        avatar.race = document.getElementById("race").value;//options[raceSelect.selectedIndex].value;
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