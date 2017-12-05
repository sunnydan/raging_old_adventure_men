function Input(){
	let keys = [];
	let mouse = [];

	document.addEventListener("keydown",function(e){
		keys[e.key] = true;
	});
	document.addEventListener("keyup",function (e){
		keys[e.key] = false;
	});
	this.isDown = function(key){
		return keys[key] == true;
	}
	this.isUp = function(key){
		return keys[key] == true;		
	}
}