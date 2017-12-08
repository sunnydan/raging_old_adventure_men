var util = {
	AABB(a,b){
		return a.x < b.x + b.w &&
		a.x + a.w > b.x &&
		a.y < b.y + b.h &&
		a.y + a.h > b.y;	
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
