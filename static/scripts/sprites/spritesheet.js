var game;

function Spritesheet(src, spritewidth, spriteheight, verticalgap, horizontalgap, spritesacross, spritesdown, ) {
    this.ready = false;
    this.spritewidth = spritewidth;
    this.spriteheight = spriteheight;
    this.verticalgap = verticalgap;
    this.horizontalgap = horizontalgap;
    this.spritesacross = spritesacross;
    this.spritesdown = spritesdown;
    this.imageObj = new Image();
    this.sprites = [];

    this.imageObj.onload = () => {
        for (let x = 0; x < this.spritesacross; x++) {
            this.sprites.push([]);
            for (let y = 0; y < this.spritesdown; y++) {
                this.sprites[x].push(
                    {
                        cX: x * (spritewidth + verticalgap),
                        cY: y * (spriteheight + horizontalgap),
                        w: spritewidth,
                        h: spriteheight
                    }
                    // new Sprite(
                    //     this.imageObj,
                    //     x * (spritewidth + verticalgap),
                    //     y * (spriteheight + horizontalgap),
                    //     this.spritewidth,
                    //     this.spriteheight
                    // )
                );
            }
        }
        this.ready = true;

        // Lets do this on window.onload()?

        if (citySheet.ready && dungeonSheet.ready && indoorSheet.ready && rogueSheet.ready) {
            try {
                game = new Game(512, 512);
                game.start();
            }
            catch (err) {
                makeAllSprites();
            }
        }
    }

    this.imageObj.src = src;
}