class PauseMenu extends Panel{
	constructor(isChild){
		super(isChild);
		this.init();
		instance.hook("OnKeyUp","ROAM-Pause",(str,key)=>{this.bind(key);});
		instance.hook("OnKeyDown","ROAM-PauseScroll",(str,key)=>{this.scroll(key);});	
	}

	init(){
		game.paused=!game.paused;
		this.selected=0;
		this.color="rgba(32,32,32,.5)";
		this.navColor="rgba(0,0,0,0)";
		this.title="R.O.A.M.";
		this.showTitle=true;

		this.options=[
			"Resume",
			"Fullscreen",
			"Foolscreen",
			"Droolscreen",
		];

		let text = gui.create("Panel",this);
		text.color="rgb(32,32,32)";
		text.h=84;

		text.onTick=()=>{
			text.x=this.w/2-text.w/2;
			text.y=32;		
		}
		text.onRender=(c)=>{
			let txtW = c.measureText(this.title).width;

			c.fillStyle=text.textColor;
			c.font="64px Arial";
			c.fillText(this.title,this.w/2-text.w/2+txtW*2,text.y+txtW);
		}

		for(let i=0;i<this.options.length;i++){		
			let op = gui.create("Option",this);
			let check = op.children[0];
			op.title=this.options[i];
			op.showBg=false;

			// TODO: Make them actually do things.
			
			// check.onClick=()=>{
			// 	this.toggle();
			// 	game.paused=!game.paused;
			// }

			op.onTick=()=>{
				op.x=this.w/2-op.w/2;
				op.y=text.h+64+i*op.h*2;
			}

			op.preRender=(c)=>{
				let osc = (Math.sin(util.getTime()*4)+1)/2;
				let col = "rgb(";
				let rgb=Math.floor(osc*32)+32;
				col += rgb+","+rgb+","+rgb+")";

				if(i == this.selected){
					c.fillStyle=col;
				}else{
					c.fillStyle=op.color;
				}

				c.fillRect(op.x,op.y,op.w,op.h);
			}
		}

	}

	bind(key){
		if(key=="Escape"){
			this.toggle();
			game.paused=!game.paused;
		}
	}

	scroll(key){
		if(!this.visible && !game.paused){return;}

		if(key=="s" || key=="ArrowDown"){
			if(this.selected < this.options.length-1){this.selected++;
			}else{this.selected=0;}
		}else if(key=="w" || key=="ArrowUp"){
			if(this.selected <= 0){this.selected=this.options.length-1;}
			else{this.selected--;}			
		}else if(key==" " || key=="Enter"||key=="e"){ // Toggle / Click
			let option = this.children[this.selected+1];
			let check = option.children[0];
			check.onClick();
		}		
	}

	tick(t){
		super.tick(t);
	}

	render(c){
		if(!this.visible && !game.paused){return;}
		let dim = util.winDim();
		this.x=dim[0].substring(0,dim[0].length-2);
		this.y=dim[1].substring(0,dim[1].length-2);
		this.w=dim[2];
		this.h=dim[3];

		super.render(c);
	}
}
gui.new("PauseMenu",PauseMenu);