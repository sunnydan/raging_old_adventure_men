var pause = {
	active:0,

	options:[
		["Fullscreen",true],
		["Option1",false],
		["Option2",false],
	],

	// tick:(str,t)=>{
	// 	if(game.paused){
			// TODO: Add pause menu options like fullscreen.
	// 	}
	// },

	scroll:function(str,key){
		if(!game.paused){return;}

		if(key=="s"||key=="ArrowDown"){
			if(pause.active < pause.options.length-1){pause.active++;
			}else{pause.active=0;}
		}else if(key=="w"||key=="ArrowUp"){
			if(pause.active <= 0){pause.active=pause.options.length-1;}
			else{pause.active--;}			
		}else if(key==" "||key=="Enter"||key=="e"){ // Toggle Option
			pause.options[pause.active][1] = !pause.options[pause.active][1];
		}
	},

	render:function(str,c){
		if(!game.paused){return;}
		let w=game.window.canvas.width;
		let h=game.window.canvas.height;
		let len=pause.options.length;

		c.fillStyle="rgba(64,64,64,0.5)";
		c.fillRect(0,0,w,h);
		c.fillStyle="rgb(255,255,255)";
		c.font="64px Arial";
		c.fillText(TITLE,w/2.5,h/6);

		for(let i=0;i<len;i++){
			let pW=w/4,pH=32,pX=w/2-pW/2,pY=h/4;

			// Option rect
			let osc = (Math.sin(util.getTime()*2)+1)/2;
			// Oscillate between 32,32,32-64,64,64
			if(i == pause.active){
				let col = "rgb(";
				let rgb=Math.floor(osc*32)+32;
				col += rgb+","+rgb+","+rgb+")";
				c.fillStyle=col;
			}else{
				c.fillStyle="rgb(64,64,64)";					
			}
			c.fillRect(pX,pY+i*64,pW,pH);

			// Checkbox
			c.fillStyle="rgb(255,255,255)";
			c.fillRect(pX+pW-24-4,pY+i*64+4,24,24);
			// Make it look active
			if(pause.options[i][1]){
				c.fillStyle="rgb(200,100,100)";
				c.fillRect(pX+pW-24-2,pY+i*64+6,20,20);				
			}

			// Option Text
			c.font="20px Arial";
			c.fillStyle="rgb(255,255,255)";
			c.fillText(pause.options[i][0],pX+4,pY+i*64+24);
		}
	}
}
// instance.hook("Tick","pause.tick",pause.tick);
instance.hook("Render","pause.render",pause.render);
instance.hook("OnKeyDown","pause.scroll",pause.scroll);