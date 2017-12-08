class Moving extends Sprite{
	constructor(sheet, xInd, yInd, x, y){
		super(sheet, xInd, yInd, x, y);
		this.xV=0;
		this.yV=0;
		this.friction=.25;
		this.acc=.25;
		this.cap=.25;
		this.dir=DIR_RIGHT;
		this.lastDir=this.dir;
	}

	move(dt){
		
	}

	tick(dt){
		this.x += this.xV;
		this.y += this.yV;

		this.xV *= (1 - Math.min(this.friction, 1));
		this.yV *= (1 - Math.min(this.friction, 1));
		
		if(this.dir == DIR_LEFT && this.xV > -this.cap){
			this.xV -= this.acc;
			this.lastDir=this.dir;
		}else if(this.dir == DIR_RIGHT && this.xV < this.cap){
			this.xV += this.acc;
			this.lastDir = this.dir;
		}

		if (this.dir == DIR_UP && this.yV > -this.cap) {
			this.yV -= this.acc;
			this.lastDir = this.dir;
		}else if(this.dir == DIR_DOWN && this.yV < this.cap) {
			this.yV += this.acc;
			this.lastDir = this.dir;
		}

		this.move(dt);
	}
}