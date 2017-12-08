function AvatarSprite() {
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
    this.makeAvatar = (location)=>{
        var ctx = location.getContext("2d");
        //DEPRECATED: code for player layer at this location does HERE
        ctx.clearRect(0, 0, location.width, location.height)
        if (this.base) this.base.render(ctx);
        if (this.pants) this.pants.render(ctx);
        if (this.boots) this.boots.render(ctx);
        if (this.torso) this.torso.render(ctx);
        if (this.hair) this.hair.render(ctx);
        if (this.hat) this.hat.render(ctx);
        if (this.beard) this.beard.render(ctx);
        if (this.left) this.left.render(ctx);
        if (this.right) this.right.render(ctx);
    }
}
const races = ["elf", "hobbit", "human", "orc"]
const gender = ["male", "female"]
const hair_styles = ["short", "long", "fu_manchu", "default", "medium", "braid-left", "braid-right", "2braid", "bowl_stache", "topknot", "fro", "balding"]
const hair_colors = ["d_brown", "l_brown", "blonde", "black", "white"]
const bases = [
    { race: "elf", gender: "male", location: [0, 0] },
    { race: "elf", gender: "female", location: [0, 1] },
    { race: "hobbit", gender: "male", location: [1, 0] },
    { race: "hobbit", gender: "female", location: [1, 1] },
    { race: "human", gender: "male", location: [2, 0] },
    { race: "human", gender: "female", location: [2, 1] },
    { race: "orc", gender: "male", location: [3, 0] },
    { race: "orc", gender: "female", location: [3, 1] }
]
// const bases=[
//     {style:"", color:"", location:[]}
// ]

class Avatar {
    // //Unchangeables
    // this.race;
    // this.gender;
    // this.hair;
    // this.hair_color;
    // this.beard;
    //Equipped



    constructor(race, gender, hair, hair_color, beard = "") {
        this.race = race;
        this.gender = gender;
        this.hair = hair;
        this.hair_color = hair_color;
        this.beard = beard;
        setBase();
        setHair();
        setBeard();
    }
    setBase() {
        //Validate options are present
        for(let i=0;i<bases.length;i++){
            if (this.race === bases[i].race && this.gender == bases[i].gender) {
                console.log(bases[i].location)
                //
            }
        }
        // this.base = allSprites[][];
    }
    setHair() {
        //Validate options are present
        this.hair_link = `${this.hair}_${this.hair_color}.png`;
    }
    setBeard() {
        //Validate presence of beard in array
        if (this.beard.length > 0) {
            this.beard_link = `${this.beard}.png`;
        }
    }
    setLayers(canvasID) {
        var c = document.getElementById(canvasID);
        var ctx = c.getContext("2d");
        var base = new Image();//base
        var pants = new Image();//pants
        var boots = new Image();//boots
        var torso = new Image();//torso
        var hair = new Image();//hair
        var beard = new Image();//beard
        //Base first
        base.src = "images/halfling_m.png";
        base.onload = function () {
            ctx.drawImage(base, 0, 0);
            pants.src = "images/pants_black.png";
            pants.onload = function () {
                ctx.drawImage(pants, 3, 13);
                boots.src = "images/boots_black.png";
                boots.onload = function () {
                    ctx.drawImage(boots, 1, 14)
                    torso.src = "images/chain_green.png";
                    torso.onload = function () {
                        ctx.drawImage(torso, 0, 4);
                        hair.src = "images/2braid_blonde.png";
                        hair.onload = function () {
                            ctx.drawImage(hair, 3, 1);
                        }
                    }
                    // var img = c.toDataURL("image/png");
                    // document.write('<img src="' + img + '" />');
                }

            }
        };
        //beard second to last
        //weapon last
    }

}