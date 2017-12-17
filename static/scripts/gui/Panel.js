class Panel{
	constructor(isChild){
		this.x=256;
		this.y=256;
		this.w=512;
		this.h=512;
		this.color="rgb(200,200,200)";
		this.visible=true;
		this.children=[];
		this.parent=null;

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

	tick(t){ // update children.
		if(!this.visible){return;}
		for(let i=0;i<this.children.length;i++){
			this.children[i].tick(t);
		}
	}

	render(c){ // Render children.
		if(!this.visible){return;}
		for(let i=0;i<this.children.length;i++){
			this.children[i].render(c);
		}
	}
}
gui.new("Panel",Panel);