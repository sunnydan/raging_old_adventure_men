var citySheet;
var dungeonSheet;
var indoorSheet;
var rogueSheet;

window.onload = function() {
    citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);
    dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 37, 28);
    indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 37, 28);
    rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 37, 28);
}

var room1 = new Room();

function loadRooms() {    
    loadJSON("rooms/room1.json", (response) => {
        var roomJson = JSON.parse(response);
        for(var row in roomJson.floor) {
            for(var roomcode in row) {

            }
        }
    })

    runGame();
}

function codeToSprite(code) {
    let Cspritesheet;
    if(code[0] == "c") {
        Cspritesheet = citySheet;
    } else if(code[0] == "d") {
        Cspritesheet = dungeonSheet;
    } else if(code[0] == "i") {
        Cspritesheet = indoorSheet;
    } else if(code[0] == "r") {
        Cspritesheet = rogueSheet;
    }
    let xindex = parseInt(code.slice(1,3));
    let yindex = parseInt(code.slice(3,5));
    return Cspritesheet.sprites[xindex][yindex];
}

function loadJSON(jsonfile, callback) {
    
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', jsonfile, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
