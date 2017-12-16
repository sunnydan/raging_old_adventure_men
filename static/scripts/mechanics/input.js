var input = {
	keys:[],

	keyDown:(key)=>{
		return input.keys[key] == true;
	},
	keyUp:(key)=>{
		return input.keys[key] == true;
	}
}

document.addEventListener("keydown",(e)=>{
	input.keys[e.key] = true;
	instance.call("OnKeyDown",e.key);
});
document.addEventListener("keyup",(e)=>{
	input.keys[e.key] = false;
	instance.call("OnKeyUp",e.key);
});

// Main Pause
instance.hook("OnKeyUp","ROAM-Pause",function(str,key){
	if(key == "Escape"){game.paused=!game.paused;}
});