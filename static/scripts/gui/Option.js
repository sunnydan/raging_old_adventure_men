class Option extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
	}

	init(){
		let self=this;
		this.w=512;
		this.h=32;
		this.color="rgb(32,32,32)";
		this.navColor="rgba(0,0,0,0)";
		this.showTitle=true;

		let check=gui.create("Checkbox",this);
		check.w=24;
		check.h=24;
		check.onTick=()=>{
			check.x=self.x+self.w-check.w-4;
			check.y=self.y+4;
		}
	}

	tick(t){
		super.tick(t);
	}

	render(c){
		super.render(c);
	}
}
gui.new("Option",Option);