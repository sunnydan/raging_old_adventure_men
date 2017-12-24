class Emitter{
	constructor(){
		this.id=entities.active.length;
		this.class=this.constructor.name;
		this.parent=null;
		this.particles=[];
		this.x=256;
		this.y=256;
		this.max=24;
		this.rate=.125;
		this.delta=util.getTime();

		entities.active.push(this);
	}
	// Edit / Create particles via this callback as they're being emitted / created.
	onEmit(){

	}

	emit(){
		if(util.getTime()-this.delta >= this.rate){
			//let p = new Particle(this);
			this.onEmit();
			this.delta=util.getTime();
		}
	}

	attach(parent){
		if(!parent){return;}
		this.parent=parent;
	}	

	tick(t){
		if(this.parent){
			this.x=this.parent.x;
			this.y=this.parent.y;
		}

		this.emit();

		for(let i=0;i<this.particles.length;i++){
			if(this.particles[i] && this.particles[i].tick){
				this.particles[i].tick(t);
			}
		}
	}

	render(c){
		for(let i=0;i<this.particles.length;i++){
			if(this.particles[i] && this.particles[i].render){
				this.particles[i].render(c);
			}
		}
	}
}