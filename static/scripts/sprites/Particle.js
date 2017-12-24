class Particle{
	constructor(parent,sprite){ // Allow for setting a sprite.
		if(!parent){return undefined;}
		if(parent.constructor.name != "Emitter"){return undefined;}

		this.id=parent.particles.length;
		this.class=this.constructor.name;
		this.parent=parent;
		if(sprite){this.sprite=sprite;}
		this.x=parent.x;
		this.y=parent.y;
		this.xV=0;
		this.yV=0;
		this.gravity=.5;
		this.endSize=0;
		this.startSize=0;
		this.life=0;
		this.decay=50;
		this.color="#fff";

		parent.particles[this.id] = this;
	}

	tick(t){
		this.x += this.xV;
		this.y += this.yV;

		this.yV += this.gravity;
		this.life++;

		if(this.startSize != 0){
			if(this.endSize < 1){this.endSize=1;}

			if(this.startSize > this.endSize){
				this.startSize -= this.endSize;
			}else{
				this.startSize += this.endSize;
			}
		}

		if(this.life > this.decay){
			delete this.parent.particles[this.id];
		}
	}

	render(c){
		if(this.sprite){
			// c.drawImage(this.sprite.sheet, this.sprite.cX, this.sprite.cY, this.sprite.w, this.sprite.h);
			c.drawImage(this.sprite.sheet, this.sprite.cX, this.sprite.cY,this.sprite.w,this.sprite.h,this.x,this.y,this.sprite.w,this.sprite.h);

		}else{
			c.beginPath();
			c.fillStyle=this.color;
			c.arc(this.x,this.y,this.startSize,0,Math.PI*2,true);
			c.closePath();
			c.fill();
		}
	}
}