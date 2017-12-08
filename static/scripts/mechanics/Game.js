class Game{
	constructor(w,h){
		this.id=0;
		this.before=0;
		this.after=0;
		this.delta=0;
		this.window=new Window(w,h);
	}

	start(){
		new Sprite(rogueSheet,6,0,128,128);

		let pl = new Player(rogueSheet,5,0,0,0);
		pl.x = 256;
		pl.y = 256;

		this.run(this);
	}

	stop(){
		cancelAnimationFrame(this.id);
	}

	run(self){
		this.after=Date.now();
		this.delta=this.after-this.before;
		this.window.tick(this.delta);
		this.window.render();
		this.before=Date.now();

		requestAnimationFrame(()=>{
			this.run(self);
		});
	}
}