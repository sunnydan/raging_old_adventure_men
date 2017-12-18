class Panel{
	constructor(isChild){
		this.x=256;
		this.y=256;
		this.w=512;
		this.h=512;
		this.color="rgb(200,200,200)";
		this.navColor="rgb(32,32,32)";
		this.textColor="rgb(255,255,255)";
		this.visible=true;
		this.children=[];
		this.parent=null;
		this.title="Default Text";
		this.showTitle=false;
		this.showBg=true;
		this.showNav=false;

		if(!isChild){
			this.id=gui.active.length;
			this.class=this.constructor.name;
			gui.active.push(this);		
		}
	}

	show(){
		this.visible=true;
	}

	hide(){
		this.visible=false;
	}

	toggle(){
		this.visible=!this.visible;
	}

	center(){
		this.x=game.window.canvas.width/2-this.w/2;
		this.y=game.window.canvas.height/2-this.h/2;
	}
	// Callback to tick after the elements tick. 
	onTick(t){

	}

	tick(t){ // update children.
		if(!this.visible){return;}
		if(this.children.length < 1){return;}

		for(let i=0;i<this.children.length;i++){			
			this.children[i].tick(t);
			this.children[i].onTick(t);
		}
	}
	// Callback to render after the elements render. 
	onRender(c){

	}
	// Callback to render before the element's render. 
	preRender(c){

	}

	render(c){
		if(!this.visible){return;}

		if(this.showBg){
			c.fillStyle=this.navColor;
			c.fillRect(this.x,this.y,this.w,this.h);

			c.fillStyle=this.color;
			c.fillRect(this.x+1,this.y+1,this.w-2,this.h-2);
		}

		if(this.showNav){
			c.fillStyle=this.navColor;
			c.fillRect(this.x,this.y,this.w,32);
		}
		if(this.showTitle){
			c.fillStyle=this.textColor;
			c.font="16px Arial";
			c.fillText(this.title,this.x+4,this.y+22);
		}

		// Render children.
		if(this.children.length < 1){return;}
		for(let i=0;i<this.children.length;i++){
			this.children[i].preRender(c);			
			this.children[i].render(c);
			this.children[i].onRender(c);
		}
	}
}
gui.new("Panel",Panel);