class Dialogue extends Base{
	constructor(npc,dialogue){
		super(npc.x,npc.y,npc.w,npc.h);
		if(npc.class == "Player") return this; // Dont give players dialogue. Yet.

		this.id=entities.active.length;
		this.solid=false;
		this.movable=false;
		this.owner=npc;
		this.w=128;
		this.h=48;
		this.oldW=128;
		this.oldH=48;
		this.color="#ffffff";
		this.dialogue=dialogue;
		entities.active.push(this);
		this.isVisible=false;
		this.isAnimating=false;
	}

	show(){
		this.w=0; // Reset size for animating
		this.h=0;
		this.isVisible=true;
	}

	hide(){
		this.isVisible=false;
	}

	toggle(){
		if(this.isVisible){
			this.hide();
		}else{
			this.show();
		}
	}
	
	// TODO: Textwrap dialogue and scroll once the player presses space or e.
	scroll(){

	}

	tick(t){ // Keep dialogue centered above the NPC.
		this.x=this.owner.x+this.owner.w/2-this.w/2;
		this.y=this.owner.y-this.owner.h-this.h;

		if(this.isVisible){
			if(this.w != this.oldW) this.w += 8;
			if(this.h != this.oldH) this.h += 4;
			if(this.w != this.oldW && this.h != this.oldH)this.isAnimating=true;
		}else{
			if(this.w != 0)this.w -= 8;
			if(this.h != 0)this.h -= 4;
			if(this.w == 0 && this.h == 0) this.isAnimating=false;
		}
	}

	render(c){
		super.render(c);

		if(this.isVisible || this.isAnimating){
			c.fillStyle=this.color;
			c.fillRect(this.x,this.y,this.w,this.h);

			c.font="16px arial";
			c.fillStyle="#000000";
			c.textAlign="center";
			c.fillText(this.dialogue,this.x+this.w/2,this.y+this.h/2);
		}
	}
}