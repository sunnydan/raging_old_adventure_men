var gui = {
	active:[], // Store all active GUIs
	types:{},
	// Stores gui constructors
	new(alias,ctor){
		gui.types[alias] = ctor;
	},

	create:function(pnl,parent){
		if(typeof(pnl)!="string" || !gui.types[pnl]){console.log("Non-existant GUI type: ",pnl); return;}
		
		if(parent){			
			let elem = new gui.types[pnl](true);
			elem.x=parent.x;
			elem.y=parent.y;
			elem.parent=parent;
			parent.children.push(elem);

			return parent.children[parent.children.length-1];
		}

		return new gui.types[pnl](false);
	},

	tick(t){
		for(let i=0;i<gui.active.length;i++){
			gui.active[i].tick(t);
		}
	},

	render(c){ // Render active GUI's
		for(let i=0;i<gui.active.length;i++){
			gui.active[i].render(c);
		}
	}
}