var pause = {
	tick:(str,t)=>{
		if(game.paused){
			// TODO: Add pause menu options like fullscreen.
		}
	},

	render:function(str,c){
		if(game.paused){
			let w=game.window.canvas.width;
			let h=game.window.canvas.height;

			c.fillStyle="rgba(255,100,100,0.5)";
			c.fillRect(0,0,w,h);
			c.fillStyle="rgb(255,255,255)";
			c.font="64px Arial";
			c.fillText(TITLE,w/2.5,h/6);
		}
	}
}
instance.hook("Tick","pause.tick",pause.tick);
instance.hook("Render","pause.render",pause.render);