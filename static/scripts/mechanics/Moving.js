function Moving(sheet,x,y,xml){
	let sprite = new Sprite(sheet,x,y,xml);
	// sprite.setXML(PLAYER_SHEET);
	sprite.acc  = .15;
	sprite.friction = .30;
	sprite.cap  = 1; // Max Accel
	sprite.xVel = 0;
	sprite.yVel = 0;

	sprite.animate = function(){

	}

	sprite.tick = function(delta){
		sprite.doMove(delta);
	}

	// Movement callback
	sprite.move = function(dt){

	}

	sprite.collide = function(dt){
		
	}

	sprite.doMove = function(dt){
		sprite.x += sprite.xVel;
		sprite.y += sprite.yVel;

		sprite.xVel *= (1-Math.min(sprite.friction,1));
		sprite.yVel *= (1-Math.min(sprite.friction,1));

		sprite.move(dt);
	}

	return sprite;
}