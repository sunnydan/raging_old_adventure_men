var citySheet;
var dungeonSheet;
var indoorSheet;
var rogueSheet;

window.onload = () => {
    citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);
    dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 37, 28);
    indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 37, 28);
    rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 37, 28);
}

var rooms = [];

function loadRooms() {
    var numberOfRooms = 1;
    for(let i = 0; i < numberOfRooms; i++) {
        rooms.push(new Room("rooms/room"+padZeroes(i)+".json"))
    }
}

function padZeroes(num) {
    let str = "" + num;
    while(str.length < 3) {
        str = "0" + str;
    }
    return str;
}