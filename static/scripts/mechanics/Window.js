class Window{
	constructor(w,h){
		this.w=w;
		this.h=h;
		this.canvas=document.getElementById("game");
		this.canvas.width=w;
		this.canvas.height=h;
		this.canvas.style.position="absolute";
		this.context=this.canvas.getContext("2d");
	}

	center(){
		let winW =window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
		let winH = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		// If fullscreen
		if(pause.options[0][1]){
			this.canvas.width=winW;
			this.canvas.height=winH;
			this.canvas.style.left=0;
			this.canvas.style.top=0;
		}else{
			this.canvas.width=this.w;
			this.canvas.height=this.h;
			this.canvas.style.left = winW/2-this.canvas.width/2;
			this.canvas.style.top  = winH/2-this.canvas.height/2;
		}
	}

	clear(){
		this.context.fillStyle = "rgb(0,0,0)";
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}

	tick(t){
		gui.tick(t);
		if(!game.paused){entities.tick(t);}
		// Passes Delta
		instance.call("Tick",t);
	}

	render(){
		this.center();
		this.clear();
		entities.render(this.context);
		gui.render(this.context); // Render GUI's after entities.
		// Passes canvas context.
		instance.call("Render",this.context);
	}
}