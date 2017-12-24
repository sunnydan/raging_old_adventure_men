class Player extends NPC{
	constructor(sheet, xInd, yInd, x, y){
		super(sheet, xInd, yInd, x, y);
		this.fireDelay = .25;
		this.cur = util.getTime();
		this.interacting = false;
	}

	interact(){

	}

	move(dt){
		if(input.keyDown("a") || input.keyDown("ArrowLeft")){
			this.xDir = DIR_LEFT;
		}else if(input.keyDown("d") || input.keyDown("ArrowRight")){
			this.xDir = DIR_RIGHT;
		}else if(!input.keyDown("a") && !input.keyDown("d") && !input.keyDown("ArrowLeft") && !input.keyDown("ArrowRight")){
			this.xDir = DIR_IDLE;
		}

		if(input.keyDown("w") || input.keyDown("ArrowUp")){
			this.yDir = DIR_UP;
		}else if(input.keyDown("s") || input.keyDown("ArrowDown")){
			this.yDir = DIR_DOWN;
		}else if(!input.keyDown("w") && !input.keyDown("s") && !input.keyDown("ArrowUp") && !input.keyDown("ArrowDown")){
			this.yDir = DIR_IDLE;
		}

		//TODO: Mouse Based / Directional aiming.
	}

	interact(){
		if(input.keyDown("e") && !this.interacting){
			let ent = util.findClosestInRange(
				this,
				this.interactRange
			);

			if(ent != null && ent.canInteract) ent.onInteract(this); // Fire NPC's interact event

			this.interacting = true;
			
			// Passes the two entities that interacted.
			instance.call("OnInteract","ROAM-OnInteract",this,ent);
		}else if(!input.keyDown("e") && this.interacting){
			this.interacting = false;
		}
	}

	// render(c){
		// c.globalCompositeOperation = "source-over";
		// c.fillStyle="rgba(0,0,0,1)";
		// c.fillRect(this.x,this.y,this.w,this.h);
		// c.globalCompositeOperation = "lighter";

	// 	c.beginPath();

	// 	let g = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.w);
	// 	g.addColorStop(0, "white");
	// 	g.addColorStop(0.4, "white");
	// 	g.addColorStop(0.4, this.color);
	// 	g.addColorStop(1, "black");

	// 	c.fillStyle = g;
	// 	c.arc(this.x+Math.sin( util.getTime()*16 )*8, this.y, this.w, Math.PI*2, false);
	// 	c.fill();
	// }
}