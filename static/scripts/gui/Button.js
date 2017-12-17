class Button extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
	}

	init(){
		this.hovered=false;
		this.w=30;
		this.h=30;
		this.color="rgb(32,32,32)";
		this.hoverColor="rgb(200,100,100)";
		this.text="X";
	}

	onClick(x,y){

	}

	onHover(x,y){

	}

	hover(x,y){
		// Give mouse an 8x8 hitbox.
		if(util.AABB({x:x,y:y,w:1,h:1},this)){
			this.hovered=true;
			this.onHover(x,y); // Callback
		}else{
			this.hovered=false;
		}
	}

	// Click x and y come from input and aren't set until clicks occur
	click(x,y){
		// Reset clickX and clickY, so it only fires once.
		if(util.AABB({x:x,y:y,w:1,h:1},this)){
			this.onClick(x,y); // Callback
			input.clickX=-1;
			input.clickY=-1;
		}
	}

	tick(t){
		this.hover(input.mouseX,input.mouseY);
		this.click(input.clickX,input.clickY);
	}

	render(c){
		if(this.hovered){
			c.fillStyle=this.hoverColor;			
			c.fillRect(this.x,this.y,this.w,this.h);
		}
		// }else{
		// 	c.fillStyle=this.color;
		// }

		c.fillStyle="#ffffff";
		c.font="16px Arial";
		c.fillText(this.text,this.x+10,this.y+22);
	}
}
gui.new("Button",Button);