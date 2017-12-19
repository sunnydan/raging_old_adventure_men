class Menu extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
		instance.hook("OnKeyUp","ROAM-Inventory",(str,key)=>{this.bind(key);});
	}

	bind(key){
		if(key=="q"){this.toggle();}
	}

	init(){
		this.showNav=true;
		this.showTitle=true;
		let par = this;

		let close = gui.create("Button",this);
		close.text="x";
		close.onClick=(x,y)=>{this.toggle();}
		close.onTick=(t)=>{
			close.x=par.x+par.w-close.w-1;
			close.y=par.y+1;
		}

		let max = gui.create("Button",this);
		max.text="[]";
		max.onTick=(t)=>{
			max.x=close.x-max.w-1;
			max.y=par.y+1;
		}

		let min = gui.create("Button",this);
		min.text="-";
		min.onTick=(t)=>{
			min.x=max.x-min.w-1;
			min.y=par.y+1;
		}
	}

	tick(t){
		if(!this.visible){return;}
		super.tick(t);
	}

	render(c){
		if(!this.visible){return;}
		super.render(c);
	}
}
gui.new("Menu",Menu);