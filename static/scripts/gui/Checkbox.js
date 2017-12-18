class Checkbox extends Button{
	constructor(isChild){
		super(isChild);
		this.init();
	}

	init(){
		this.active=false;
		this.text="";
		this.w=30;
		this.h=30;
		this.color="rgb(255,255,255)";
		this.hoverColor="rgb(127,127,127)";
		this.activeColor="rgb(200,100,100)";
	}

	onClick(x,y){
		this.active=!this.active;
	}

	onHover(x,y){

	}

	tick(t){
		super.tick(t);
	}

	render(c){
		c.fillStyle=this.color;
		c.fillRect(this.x,this.y,this.w,this.h);

		if(this.active){
			c.fillStyle=this.activeColor;
		}else if(this.hovered){
			c.fillStyle=this.hoverColor;
		}

		c.fillRect(this.x+2,this.y+2,this.w-4,this.h-4);
	}
}
gui.new("Checkbox",Checkbox);