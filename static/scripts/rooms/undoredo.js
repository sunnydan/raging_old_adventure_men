function UndoRedo() {
    this.layer = -1;
    this.oldtiles = [];
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
                if (newtiles[x][y] != null) {
                    oldtiles[x][y] = room.tiles[x][y][layer];
                }
            }
        }
    }

    this.useOld = (room) => {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (oldtiles[x][y] != null) {
                    room.setTile(oldtiles[x][y], x, y, this.layer);
                }
            }
        }
    }

    this.useNew = (room) => {
        for (let x = 0; x < 16; x++) {
            for (let y = 0; y < 16; y++) {
                if (newtiles[x][y] != null) {
                    room.setTile(newtiles[x][y], x, y, this.layer);
                }
            }
        }
    }

    this.setNext = (nextundoredo) => {
        this.next = nextundoredo;
        nextundoredo.prev = this;
    }
}