function Charsheet(src, spritewidth, spriteheight, horizontalgap, verticalgap, spritesacross, spritesdown, ) {
    this.ready = false;
    this.spritewidth = spritewidth;
    this.spriteheight = spriteheight;
    this.verticalgap = verticalgap;
    this.horizontalgap = horizontalgap;
    this.spritesacross = spritesacross;
    this.spritesdown = spritesdown;
    this.imageObj = new Image();
	this.sprites = [];
	this.xml = [];

    this.imageObj.onload = () => {
        for (let x = 0; x < this.spritesacross; x++) {
            this.sprites.push([]);
            for (let y = 0; y < this.spritesdown; y++) {
                this.sprites[x].push(new Sprite(this.imageObj, x * (spritewidth + horizontalgap),
                    y * (spriteheight + verticalgap), this.spritewidth, this.spriteheight));
            }
        }
        this.ready = true;
        if (charSheet.ready) {
            try {
                loadRooms();
            }
            catch(err) {
                makeCharSprites();
            }
        }
    }

	this.imageObj.src = src;
}