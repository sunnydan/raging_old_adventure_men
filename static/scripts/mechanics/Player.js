class Player extends NPC{
	constructor(sheet, xInd, yInd, x, y){
		super(sheet, xInd, yInd, x, y);
		
		this.fireDelay = .25;
		this.cur = util.getTime();
	}

	move(dt){
		if(input.keyDown("a")){
			this.dir = DIR_LEFT;
		}else if(input.keyDown("d")){
			this.dir = DIR_RIGHT;
		}

		if(input.keyDown("w")){
			this.dir = DIR_UP;
		}else if(input.keyDown("s")){
			this.dir = DIR_DOWN;
		}

		if (!input.keyDown("w") && !input.keyDown("s") && !input.keyDown("a") && !input.keyDown("d")){
			this.dir = DIR_IDLE;
		}

		if(input.keyDown(" ")){
			if(util.getTime()-this.cur >= this.fireDelay){
				this.cur = util.getTime();

				let p = new Projectile(
					rogueSheet,
					0,
					1,
					this.x,
					this.y
				);

				p.dir = this.lastDir;
				p.owner=this;
			}
		}
	}
}