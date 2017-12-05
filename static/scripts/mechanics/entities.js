var entities = {
	valid:{},
	active:[],
    index:0, // Each entity should have an Id / Index for lookup.

    collide:function(a){
        for(var k=0;k<entities.active.length;k++){
            let b = entities.active[k];

            if(a != b && util.AABB(a,b)){
                a.collide(b);
                b.collide(a);
            }
        }
    },

	create(type){
		if(!entities.valid[type]){
			console.log("Failed to create non-existant entity: "+type);
			return;
		}
		let ent = entities.valid[type]();
		entities.active.push(ent); // Add to all ents.
		ent.id = entities.index++;
		ent.class = type;

		return ent;
	},

	render(context){
		for(let i=0;i<entities.active.length;i++){
			entities.active[i].render(context);
		}
	},

	// TODO: Pass / Handle delta time.
	tick(delta){
		for (let i = 0; i < entities.active.length;i++){
			entities.active[i].tick(delta);
			entities.collide(entities.active[i]);
		}
	}
}