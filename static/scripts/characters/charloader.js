var allSprites;
var allSpritesXL;
var charSheet;
window.onload = () => {
    // rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 57, 31);
    // dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 29, 18);
    // indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 27, 18);
	// citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);
    charSheet = new Charsheet("/resources/sprites/tiles/roguelikeChar_transparent.png", 16, 16, 1, 1, 54, 12);
    charXLSheet = new Charsheet("/resources/sprites/tiles/char_larger.png", 16*8, 16*8, 1*8, 1*8, 54, 12);
    //XML
	
	// util.loadXML("/resources/sprites/characters/alienBeige.xml",(data)=>{PLAYER_SHEET=data;});

	setTimeout(()=>{
		// Game();
	},32);
}

function makeCharSprites() {
    allSprites = [];
    for (let x = 0; x < charSheet.sprites.length; x++) {
        allSprites.push([]);
        for (let y = 0; y < charSheet.sprites[x].length; y++) {
            allSprites[x].push(new Sprite(charSheet, x, y, null, null));
        }
    }
    allSpritesXL = [];
    for (let x = 0; x < charXLSheet.sprites.length; x++) {
        allSpritesXL.push([]);
        for (let y = 0; y < charXLSheet.sprites[x].length; y++) {
            allSpritesXL[x].push(new Sprite(charXLSheet, x, y, null, null));
        }
    }
    loadCharSheetCanvas();
}