var entities = {
	valid:{},
	active:[],
    index:0,

    collide:function(a){
        for(var k=0;k<entities.active.length;k++){
            let b = entities.active[k];

            if(a != b && util.AABB(a,b)){
                a.collide(b);
                b.collide(a);
                // Passes the two entities that collided.
                instance.call("OnCollide","ROAM-OnCollide",a,b);
            }
        }
    },

	render(context){
		for(let i=0;i<entities.active.length;i++){
			entities.active[i].render(context);
		}
	},

	tick(delta){
		for (let i = 0; i < entities.active.length;i++){
			entities.active[i].tick(delta);
			entities.collide(entities.active[i]);
		}
	},
}