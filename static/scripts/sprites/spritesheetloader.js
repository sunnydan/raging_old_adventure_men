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

    // XML
    // util.loadXML("/resources/sprites/characters/alienBeige.xml",(data)=>{PLAYER_SHEET=data;});

    setTimeout(() => {
        try {
            let game = new Game(512, 512);
            game.start();
        } catch(err) {

        }
    }, 32);

}

function makeAllSprites() {
    //allSprites = rogueSheet.sprites;
    allSprites = [];
    for (let x = 0; x < rogueSheet.sprites.length; x++) {
        allSprites.push([]);
        for (let y = 0; y < rogueSheet.sprites[x].length; y++) {
            allSprites[x].push(new Sprite(rogueSheet, x, y, null, null));
        }
    }
    for (let x = 0; x < dungeonSheet.sprites.length; x++) {
        for (let y = 0; y < dungeonSheet.sprites[x].length; y++) {
            allSprites[x].push(new Sprite(dungeonSheet, x, y, null, null));
        }
    }
    for (let x = 0; x < indoorSheet.sprites.length; x++) {
        for (let y = 0; y < indoorSheet.sprites[x].length; y++) {
            allSprites[x + dungeonSheet.sprites.length].push(new Sprite(indoorSheet, x, y, null, null));
        }
    }
    for (let x = 0; x < citySheet.sprites.length; x++) {
        for (let y = 0; y < citySheet.sprites[x].length; y++) {
            allSprites[x].push(new Sprite(citySheet, x, y, null, null));
        }
    }
    try {
        loadSpriteSheetCanvas();
    } catch(err) {
        console.log(err);
    }
}