class Game{
	constructor(w,h){
		this.id=0;
		this.before=0;
		this.after=0;
		this.delta=0;
		this.window=new Window(w,h);
		this.paused=false;
	}

	start(){
		// let npc  = new NPC(rogueSheet,8,0,480,480);		

		let pl = new Player(rogueSheet,7,0,512,512);
		
		// let menu = gui.create("Menu");
		// menu.y = 128;

		// gui.create("PauseMenu");

		let e = new Emitter();
		e.x = 512;
		e.y = 512;
		e.rate=0;
		e.onEmit=(p)=>{
			let g = Math.floor(Math.random()*50+50);
			let a = Math.random()*2-1;
			if(a < 0){a=1;}

			p.gravity=-.5;
			p.xV=0;
			p.yV=1;
			p.decay=30;
			p.size=Math.random()*10+10;
			p.endSize=0;
			p.color="rgba(255,"+g+",0,"+a+")";
		}
		e.attach(pl);

		this.run(this);
	}

	stop(){
		cancelAnimationFrame(this.id);
	}

	run(self){
		this.after=util.getTime();
		this.delta=this.after-this.before;

		this.window.tick(this.delta);
		this.window.render();
		
		this.before=util.getTime();

		requestAnimationFrame(()=>{
			this.run(self);
		});
	}
}