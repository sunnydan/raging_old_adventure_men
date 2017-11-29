function Room(src) {
    this.ready = false;
    //2D arrays of sprites
    this.floor = [];
    this.walls = [];
    this.decorations = [];

    for (let i = 0; i < 16; i++) {
        this.floor.push([]);
        this.walls.push([]);
        this.decorations.push([]);
    }

    loadJSON(src, (response) => {
        var roomJson = JSON.parse(response);
        for (let x = 0; x < roomJson.floor.length; x++) {
            for (let y = 0; y < roomJson.floor[x].length; y++) {
                this.floor[x][y] = codeToSprite(roomJson.floor[x][y]);
            }
        }
        this.onReady();
    });

    this.loadJson = loadJSON;
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

    this.onReady = onReady;
    function onReady() {
        this.ready = true;
        let allready = true;
        for (var room in rooms) {
            if (room.ready == false) {
                allready = false;
                break;
            }
        }
        if (allready) {
            runGame();
        }
    }

    this.drawRoom = drawRoom;
    function drawRoom(ctx) {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                let Csprite = this.floor[x][y];
                Csprite.drawImage(ctx, x * Csprite.width, y * Csprite.height, Csprite.width, Csprite.height);
            }
        }
    }

    this.codeToSprite = codeToSprite;
    function codeToSprite(code) {
        let Cspritesheet;
        if (code[0] == "c") {
            Cspritesheet = citySheet;
        } else if (code[0] == "d") {
            Cspritesheet = dungeonSheet;
        } else if (code[0] == "i") {
            Cspritesheet = indoorSheet;
        } else if (code[0] == "r") {
            Cspritesheet = rogueSheet;
        }
        let xindex = parseInt(code.slice(1, 3));
        let yindex = parseInt(code.slice(3, 5));
        return Cspritesheet.sprites[xindex][yindex];
    }
}