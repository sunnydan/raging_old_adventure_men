// Used for latching onto events.
// Use instance.call("yourEvent") to create an event, passing optional args.
// Use hook to hook onto an event.

var instance = {
	instances:{},

	hook:function(e,alias,cb){ // Args: Event, Alias, Callback
		if(!instance.instances[e]){
			instance.instances[e] = {};
		}

		instance.instances[e][alias] = cb;
	},

	destroy:function(e){
		instance.instances[e][alias] = null;
	},

	call:function(e){ // Fire all methods by this instance name.
		if(!instance.instances[e]){return;}

		for(let i in instance.instances[e]){
			instance.instances[e][i].apply(this,arguments);
		}
	}
}