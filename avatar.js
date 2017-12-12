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
    }
}