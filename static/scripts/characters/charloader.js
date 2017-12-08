// var citySheet;
// var dungeonSheet;
// var indoorSheet;
// var rogueSheet;
var allSprites;
var charSheet;

// var PLAYER_SHEET;

window.onload = () => {
    // rogueSheet = new Spritesheet("/resources/sprites/tiles/roguelikeSheet_transparent.png", 16, 16, 1, 1, 57, 31);
    // dungeonSheet = new Spritesheet("/resources/sprites/tiles/roguelikeDungeon_transparent.png", 16, 16, 1, 1, 29, 18);
    // indoorSheet = new Spritesheet("/resources/sprites/tiles/roguelikeIndoor_transparent.png", 16, 16, 1, 1, 27, 18);
	// citySheet = new Spritesheet("/resources/sprites/tiles/roguelikeCity_transparent.png", 16, 16, 1, 1, 37, 28);
    charSheet = new Charsheet("/resources/sprites/tiles/roguelikeChar_transparent.png", 16, 16, 1, 1, 54, 12);
    
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
    // console.log(allSprites[0][0])
    //Races: [0->1,0->3]
    //Gender: 
        //male: [0,0->3]
        //female: [1,0->3]
    loadCharSheetCanvas();
}