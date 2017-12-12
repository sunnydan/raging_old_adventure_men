// const character = require("./characters.js");
module.exports = {
    races:["elf", "hobbit", "human", "orc"],
    gender: ["male", "female"],
    hair_styles: ["short", "long", "fu_manchu", "default", "medium", "braid-left", "braid-right", "2braid", "bowl_stache", "topknot", "fro", "balding"],
    hair_colors: ["d_brown", "l_brown", "blonde", "black", "white"],
    beards: ["full", "stache", "ancient", "elder"],
    bases:[
        { race: "elf", gender: "male", x: 0, y: 0 },
        { race: "elf", gender: "female", x: 1, y: 0 },
        { race: "hobbit", gender: "male", x: 0, y: 1 },
        { race: "hobbit", gender: "female", x: 1, y: 1 },
        { race: "human", gender: "male", x: 0, y: 2 },
        { race: "human", gender: "female", x: 1, y: 2 },
        { race: "orc", gender: "male", x: 0, y: 3 },
        { race: "orc", gender: "female", x: 1, y: 3 }
    ],
    hair:()=>{
        const hair = [];
        let startLoc = [19, 0]
        let colorStart = [];
        for (let col = 0; col < hair_colors.length; col++) {
            if (col == 0 || col % 2 == 0) colorStart = [19, (col / 2) * 4]
            else colorStart = [23, ((col - 1) / 2) * 4]
            for (let style = 0; style < hair_styles.length; style++) {
                let obj = {};
                obj.style = hair_styles[style];
                obj.color = hair_colors[col];
                //calc location of each
                if (style == 0 || style % 4 == 0) obj.x = colorStart[0]
                else obj.x = colorStart[0] + (style % 4)
                obj.y = colorStart[1] + Math.floor(style / 4);
                hair.push(obj);
            }
        }
        return hair;
    },
    beard_layer:()=>{
        const beard_layer = [];
        startLoc = [19, 3];
        for (let col = 0; col < hair_colors.length; col++) {
            if (col == 0 || col % 2 == 0) colorStart = [19, startLoc[1] + (4 * (col / 2))]
            else colorStart = [23, startLoc[1] + ((col - 1) / 2) * 4]
            for (let beard = 0; beard < beards.length; beard++) {
                let obj = {};
                obj.beard = beards[beard];
                obj.color = hair_colors[col];
                obj.x = colorStart[0] + beard
                obj.y = colorStart[1]
                beard_layer.push(obj);
            }
        }
        return beard_layer;
    },
    AvatarSprite: function () {
        // Order of layers for avatar generation
        this.base;
        this.pants;
        this.boots;
        this.torso;
        this.hair;
        this.hat;
        this.beard;
        this.left;
        this.right;
        this.makeAvatar = (ctx, x = 0, y = 0) => {
            if (!(ctx instanceof CanvasRenderingContext2D)) {
                console.log("Not a canvas rendering instance"); return;
            }
            // var ctx = location.getContext("2d");
            console.log(ctx instanceof CanvasRenderingContext2D)
            //DEPRECATED: code for player layer at this location does HERE
            ctx.clearRect(0, 0, location.width, location.height)
            if (this.base) this.base.render(ctx, x, y);
            if (this.pants) this.pants.render(ctx, x, y);
            if (this.boots) this.boots.render(ctx, x, y);
            if (this.torso) this.torso.render(ctx, x, y);
            if (this.hair) this.hair.render(ctx, x, y);
            if (this.hat) this.hat.render(ctx, x, y);
            if (this.beard) this.beard.render(ctx, x, y);
            if (this.left) this.left.render(ctx, x, y);
            if (this.right) this.right.render(ctx, x, y);
        }
    },
    Avatar:class{
        constructor(allSprites,race = "elf", gender = "male", hair = "short", hair_color = "d_brown", beard = "") {
            this.race = race;
            this.gender = gender;
            this.hair_style = hair;
            this.hair_color = hair_color;
            this.beard = beard;
            this.avatarSprite = new module.exports.AvatarSprite();
            this.setBaseLayer(allSprites);
            this.setHairLayer(allSprites);
            this.setBeardLayer(allSprites);
            //Equipment
            this.torso;
            this.pants;
            this.boots;
            this.hat;
            this.weapon;
            this.shield;
        }
        setBaseLayer(allSprites) {
            //Validate options are present
            console.log(module.exports.bases)
            for (let i = 0; i < module.exports.bases.length; i++) {
                if (this.race === module.exports.bases[i].race && this.gender == module.exports.bases[i].gender) {
                    this.avatarSprite.base = allSprites[bases[i].x][bases[i].y]
                }
            }
        }
        setHairLayer(allSprites) {
            //Validate options are present
            for (let i = 0; i < module.exports.hair.length; i++) {
                if (this.hair_style === module.exports.hair[i].style && this.hair_color == module.exports.hair[i].color) {
                    this.avatarSprite.hair = allSprites[hair[i].x][hair[i].y];
                }
            }
        }
        setBeardLayer(allSprites) {
            //Validate presence of beard in array
            for (let i = 0; i < module.exports.beard_layer.length; i++) {
                if (this.beard === module.exports.beard_layer[i].beard && this.hair_color == module.exports.beard_layer[i].color) {
                    this.avatarSprite.beard = allSprites[beard_layer[i].x][beard_layer[i].y];
                }
            }
        }
    }
}