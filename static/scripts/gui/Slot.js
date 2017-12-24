class Slot extends Button{
	constructor(isChild){
		super(isChild);
		this.init();
	}

	init(){
		this.w=64;
		this.h=64;
		this.color="rgb(32,32,32)";
		this.hoverColor="rgb(0,255,0)";
		this.secondaryColor="rgb(64,64,64)";
		this.text="";
	}

	tick(t){
		super.tick(t);
	}

	render(c){
		if(this.hovered){
			c.fillStyle=this.hoverColor;
		}else{
			c.fillStyle=this.secondaryColor;			
		}
		c.fillRect(this.x,this.y,this.w,this.h);
		
		c.fillStyle=this.color;
		c.fillRect(this.x+2,this.y+2,this.w-4,this.h-4);
	}
}
gui.new("Slot",Slot);