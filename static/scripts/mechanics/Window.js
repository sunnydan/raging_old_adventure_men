class Window{
	constructor(w,h){
		this.w=w;
		this.h=h;
		this.canvas=document.getElementById("game");
		this.canvas.width=w;
		this.canvas.height=h;
		this.canvas.style.position="absolute";
		this.context=this.canvas.getContext("2d");
		this.fullScreen=true;
	}

	center(){
		let winW =window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
		let winH = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
		
		if(this.fullScreen){
			this.canvas.width=winW;
			this.canvas.height=winH;
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
		if(!game.paused){entities.tick(t);}
		// Passes Delta
		instance.call("Tick",t);
	}

	render(){
		this.center();
		this.clear();

		entities.render(this.context);

		// Passes canvas context.
		instance.call("Render",this.context);
	}
}