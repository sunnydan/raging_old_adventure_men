class Menu extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
		// There will be way more gui elements for inventory later. For now, this does what its supposed to.
		instance.hook("OnKeyUp","ROAM-Inventory",(str,key)=>{this.bind(key);});
	}

	bind(key){
		if(key=="q"){this.toggle();}
	}

	init(){
		this.title="Press Q to toggle.";
		this.navColor="rgb(32,32,32)";

		let close = gui.create("Button",this);
		close.x=this.x+this.w-close.w-1; // Top right
		close.y+=1;
		close.onClick=(x,y)=>{
			this.toggle(); // Hide this Menu.
		}
		// These are fake me out buttons, they dont do anything. Unless you want em' to.
		let max = gui.create("Button",this);
		max.x=close.x-max.w-1;
		max.y=close.y;
		max.text="□";

		let min = gui.create("Button",this);
		min.x=max.x-min.w-1;
		min.y=max.y;
		min.text="-";
	}

	tick(t){
		if(!this.visible){return;}
		super.tick(t);
	}

	render(c){
		if(!this.visible){return;}
		c.fillStyle=this.navColor;
		c.fillRect(this.x,this.y,this.w,this.h);

		c.fillStyle=this.color;
		c.fillRect(this.x+1,this.y+1,this.w-2,this.h-2);

		c.fillStyle=this.navColor;
		c.fillRect(this.x+1,this.y+1,this.w-2,32);

		c.fillStyle="#ffffff";
		c.font="16px Arial";
		c.fillText(this.title,this.x+4,this.y+22);
		super.render(c);
	}
}
gui.new("Menu",Menu);