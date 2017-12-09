var util = {
	AABB(a,b){
		return a.x < b.x + b.w &&
		a.x + a.w > b.x &&
		a.y < b.y + b.h &&
		a.y + a.h > b.y;	
	},

	distance(a, b) {
		return ((a.x - b.x) ^ 2 + (a.y - b.y) ^ 2) ^ 0.5;
	},

	distanceX(a,b){
		return ((a.x - b.x) ^ 2) ^ 0.5;
	},

	distanceY(a,b){
		return ((a.y - b.y) ^ 2) ^ 0.5;
	},

	findInRange(vec,range) { // O(N)
		let ents = [];
		// appends distance attribute to reduce runtime in findClosestInRange.
		for (let i = 0; i < entities.active.length; i++) {
			let ent = entities.active[i];
			let d = util.distance(vec, ent);
			if (d < 0) d = -d;
			if (d <= range) ents.push(ent);
		}

		return ents;
	},

	// findClosestInRange(vec,range){ // O(N^2)
	// 	let ents  = util.findInRange(vec,range);

	// 	for(let i=0;i<ents.length;i++){
	// 		let j = ents[i];
	// 	}

	// 	return ent;
	// },

	findByClassInRange(vec,range,cls){ // O(N)
		let ents = [];

		for (let i = 0; i < entities.active.length; i++) {
			let ent = entities.active[i];
			let d = util.distance(vec, ent);
			if(d < 0) d = -d;
			if(d <= range && ent.class == cls) ents.push(ent);
		}

		return ents;
	},

	loadXML(file,cb){ // file:str,tags:arr,cb:function
		let xml = new XMLHttpRequest();
		xml.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				cb(this.responseXML.children[0].children);
			}
		}
		xml.open("GET",file,true);
		xml.send();
	},
		
	getTime(){
		return new Date().getTime()/1000.0;
	},
};
