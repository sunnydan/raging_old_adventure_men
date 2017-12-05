var citySheet;
var dungeonSheet;
var indoorSheet;
var rogueSheet;
var allSprites;

var PLAYER_SHEET;

window.onload = () => {
    rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 57, 31);
    dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 29, 18);
    indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 27, 18);
	citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);

	// XML
	
	util.loadXML("/resources/sprites/characters/alienBeige.xml",(data)=>{PLAYER_SHEET=data;});

	setTimeout(()=>{
		Game();
	},32);
}

function makeAllSprites() {
    allSprites = rogueSheet.sprites;
    let sprites = dungeonSheet.sprites;
    let sprites2 = indoorSheet.sprites;
    for (let x = 0; x < sprites2.length; x++) {
        sprites.push(sprites2[x]);
    }
    for (let x = 0; x < sprites.length; x++) {
        for (let y = 0; y < sprites[x].length; y++) {
            allSprites[x].push(sprites[x][y]);
        }
    }
    sprites = citySheet.sprites;
    for (let x = 0; x < sprites.length; x++) {
        for (let y = 0; y < sprites[x].length; y++) {
            allSprites[x].push(sprites[x][y]);
        }
    }

    loadSpriteSheetCanvas();
}