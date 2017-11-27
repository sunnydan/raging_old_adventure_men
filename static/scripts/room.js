function Room() {
    //2D arrays of sprites
    this.floor = []; 
    this.walls = [];
    this.decorations = [];

    for(let i = 0; i < 32; i++) {
        this.floor.push([]);
        this.walls.push([]);
        this.decorations.push([]);
    }
}