function Game(){
	const canvas = document.getElementById("gamecanvas");
	canvas.width = 512;
	canvas.height = 512;
	// rooms[0].drawRoom(ctx);
	
    const ctx = canvas.getContext("2d");
	const FPS_CAP = 1000.0/60.0;
	
	let id;
	let prev = Date.now();
	let cur;
	let delta;

	function start(){
		let player = entities.create("Player");

		run();
	}

	function stop(){
		cancelAnimationFrame(id);
	}

	function clear(){
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}

	function run(){
		let cur = Date.now();
		let delta = cur - prev;

		tick(delta);
		render();

		prev = Date.now();
		id = requestAnimationFrame(run);
	}

	function tick(delta){
		entities.tick(delta);
	}

	function render(){
		clear();
		entities.render(ctx);
	}

	start();
}