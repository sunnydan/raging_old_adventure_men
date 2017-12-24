class Particle{
	constructor(parent){
		if(!parent){return undefined;}
		if(parent.constructor.name != "Emitter"){return undefined;}

		this.id=parent.particles.length;
		this.class=this.constructor.name;
		this.parent=parent;
		this.x=parent.x;
		this.y=parent.y;
		this.xV=0;
		this.yV=0;
		this.gravity=.5;
		this.size=10;
		this.life=0;
		this.decay=10;
		this.endSize=0;
		this.color="#fff";

		parent.particles[this.id] = this;
	}

	tick(t){
		this.x += this.xV;
		this.y += this.yV;

		this.yV += this.gravity;
		this.life++;
		// Temporary. Make a multiplier for decrementing size.
		if(this.endSize < this.size && this.size-.5 > 0){
			this.size -= .5;
		}

		if(this.life > this.decay){
			delete this.parent.particles[this.id];
		}
	}

	render(c){
		c.beginPath();
		c.fillStyle=this.color;
		c.arc(this.x,this.y,this.size,0,Math.PI*2,true);
		c.closePath();
		c.fill();
	}
}