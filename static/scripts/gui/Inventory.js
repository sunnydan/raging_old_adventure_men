class Inventory extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
	}

	init(){
		let self=this;
		this.w=1024;
		this.h=512;
		this.hoverItem=null;
		this.item=null;

		for(let y=0;y<64*8;y += 64){
			for(let x = 0; x < 64*8; x += 64){
				let slot = gui.create("Slot",this);
				slot.title=x+","+y;

				slot.onTick=(t)=>{
					slot.x = this.x+x;
					slot.y = this.y+y;
				}

				slot.onRender=(c)=>{
					c.fillStyle="rgb(255,255,255)";
					c.font="Arial 16px";
					c.fillText(slot.title,this.x+x,this.y+y);
				}

				slot.onHover=(x,y)=>{
					self.hoverItem=slot;
				}

				slot.onClick=(x,y)=>{
					self.item=slot;
				}
			}
		}

		this.pnlL = gui.create("Panel",this);
		this.pnlL.w = 256;
		this.pnlL.h = this.h;
		this.pnlL.x = 768;
		this.pnlL.y = 0;
		this.pnlL.color="rgb(32,32,32)";

		this.pnlL.onTick=(t)=>{
			this.pnlL.w = 256;
			this.pnlL.h = this.h;
			this.pnlL.x = this.w/2+256;
			this.pnlL.y = 64;
		}

		this.pnlL.onRender=(c)=>{
			if(self.hoverItem){
				c.fillStyle="rgb(255,255,255)";
				c.font="32px Arial";
				c.fillText(self.hoverItem.title,this.pnlL.x+32,this.pnlL.y+64);
			}
		}

		this.pnlR = gui.create("Panel",this);
		this.pnlR.w = 256;
		this.pnlR.h = this.h;
		this.pnlR.x = 768+256;
		this.pnlR.y = 0;
		this.pnlR.color="rgb(32,32,32)";

		this.pnlR.onTick=(t)=>{
			this.pnlR.w = 256;
			this.pnlR.h = this.h;
			this.pnlR.x = this.w/2+512;
			this.pnlR.y = 64;
		}

		this.pnlR.onRender=(c)=>{
			if(self.item){
				c.fillStyle="rgb(255,0,0)";
				c.font="32px Arial";
				c.fillText(self.item.title,this.pnlR.x+32,this.pnlR.y+64);
			}
		}
	}

	tick(t){
		super.tick(t);
	}
}
gui.new("Inventory",Inventory);