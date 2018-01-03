const TITLE="R.O.A.M.";
var citySheet;
var dungeonSheet;
var indoorSheet;
var rogueSheet;
var allSprites;

window.onload = () => {
    rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 57, 31);
    dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 29, 18);
    indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 27, 18);
    citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);
}

function pushSprites(sheet){
    for (let x = 0; x < sheet.sprites.length; x++) {
        allSprites.push([]);
        for (let y = 0; y < sheet.sprites[x].length; y++) {
            allSprites[x].push(new Sprite(sheet, x, y, null, null));
        }
    }
}

function makeAllSprites() {
    allSprites = [];

    pushSprites(rogueSheet);
    pushSprites(dungeonSheet);
    pushSprites(indoorSheet);
    pushSprites(citySheet);
    
    try {
        loadSpriteSheetCanvas();
    } catch(err) {
        console.log(err);
    }
}