function UndoRedo() {
    this.layer = -1;
    this.oldtiles = []
    this.newtiles = [];
    this.next = null;
    this.prev = null;

    for (let x = 0; x < 16; x++) {
        this.oldtiles.push([]);
        this.newtiles.push([]);
        for (let y = 0; y < 16; y++) {
            this.oldtiles[x].push(null);
            this.newtiles[x].push(null);
        }
    }

    this.getOld = (room) => {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (this.newtiles[x][y] != null) {
                    this.oldtiles[x][y] = room.tiles[x][y][this.layer];
                }
            }
        }
    }

    this.useOld = (room) => {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (this.oldtiles[x][y] != null) {
                    room.setTile(this.oldtiles[x][y], x, y, this.layer);
                }
            }
        }
    }

    this.useNew = (room) => {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (this.newtiles[x][y] != null) {
                    room.setTile(this.newtiles[x][y], x, y, this.layer);
                }
            }
        }
    }

    this.setPrev = (prevundoredo) => {
        this.prev = prevundoredo;
        prevundoredo.next = this;
    }
}