function Room() {
    this.id;
    this.name = "";
    this.user; //user who created the room
    this.rating = 0;
    this.tiles = [];
    this.northtype = "";
    this.southtype = "";
    this.easttype = "";
    this.westtype = "";

    for (let x = 0; x < 16; x++) {
        this.tiles.push([]);
        for (let y = 0; y < 16; y++) {
            this.tiles[x].push([]);
            for (let z = 0; z < 4; z++) {
                this.tiles[x][y].push(new Tile());
            }
        }
    }

    this.setTile = (tile, x, y, z) => {
        this.tiles[x][y][z] = tile;
        drawRoom();
    }
}