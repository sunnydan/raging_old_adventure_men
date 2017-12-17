var input = {
	keys:[],
	mouseX:-1,
	mouseY:-1,
	clickX:-1,
	clickY:-1,

	keyDown:(key)=>{
		return input.keys[key] == true;
	},
	keyUp:(key)=>{
		return input.keys[key] == true;
	}
}

// Main Inputs / Listeners.
document.addEventListener("keydown",(e)=>{
	input.keys[e.key] = true;
	instance.call("OnKeyDown",e.key);
});

document.addEventListener("keyup",(e)=>{
	input.keys[e.key] = false;
	instance.call("OnKeyUp",e.key);
});

document.addEventListener("mousemove",(e)=>{
	input.mouseX=e.clientX;
	input.mouseY=e.clientY;
	instance.call("OnMouseMove",e.clientX,e.clientY);
});

document.addEventListener("click",(e)=>{
	input.clickX=e.clientX;
	input.clickY=e.clientY;
	instance.call("OnMouseClick",e.clientX,e.clientY);
});

// Main Pause
instance.hook("OnKeyUp","ROAM-Pause",function(str,key){
	if(key == "Escape"){game.paused=!game.paused;}
});