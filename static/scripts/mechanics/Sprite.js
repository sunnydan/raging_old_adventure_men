function Sprite(img,x,y,xml){
	this.img = new Image();
	this.img.src = img;
    this.x = x;
    this.y = y;
    this.w = 0;
	this.h = 0;
	this.flipped = false;
	this.cropX = this.w;
	this.cropY = 0;
	this.rate  = .2;
	this.time  = util.getTime();
	this.curAnim = 0;
	this.xDir  = 0;
	this.yDir  = 0;
	this.anims = [];
	let self   = this;

	this.setXML = function(xmlSheet){ // Parses xml anims, pushing each into a dict.
		for(let i=0;i<xmlSheet.length;i++){
			let data = {};

			for(let j=0;j<xmlSheet[i].attributes.length;j++){
				let k = xmlSheet[i].attributes[j];
				data[k.name] = k.value;
			}
			self.anims.push(data);
		}
	}

	self.setXML(xml);

	this.setImage = function(num){
		if(num >= 0 || num < self.anims.length){
			self.w = self.anims[num].width;
			self.h = self.anims[num].height;
			self.cropX = self.anims[num].x;
			self.cropY = self.anims[num].y;
		}
	}

	this.collide = function(ent){
		
	}

	this.render = function(ctx){
		let rad = 0;

		if(self.flipped){
			ctx.scale(-1,1);
			ctx.drawImage(self.img, self.cropX, self.cropY, self.w, self.h, -self.x, self.y, -self.w, self.h);
			ctx.scale(-1, 1);			
		}else{		
			ctx.drawImage(self.img,self.cropX,self.cropY,self.w,self.h,self.x,self.y,self.w,self.h);
		}

		self.animate();
	}
	
	// Callback for animating a sprite.
	this.animate = function(){
		
	}

	this.play = function(start,end,flipped){
		if(util.getTime()-self.time >= self.rate){
			self.time = util.getTime();
			
			if(self.curAnim >= end){
				self.curAnim = start;
			}else if(self.curAnim < start){
				self.curAnim = start;
			}else{
				self.curAnim++;
			}

			if(flipped){ // Flips sprite horizontally
				self.flipped = true;
			}else{
				self.flipped = false;
			}

			self.setImage(self.curAnim);
		}
	}

	this.tick = function(delta){

	}
}