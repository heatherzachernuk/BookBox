class Config{
	constructor(){
		this.backgroundColor = "rgb(212, 255, 191)";
		this.detailColor = "black";
		this.titleText = "The Grapes of Wrath";
		this.authorText = "John Steinbeck";
		this.font = "Abril Fatface";
		this.height = 200;
		this.depth = 50;
		this.coverImage = false;
		this.stripes = true;
		this.subscribers = {}; 
		this.currentMenu = "Main";
	}
	get(name) {
		return this[name];
	}

	set(name, value){
		console.log("setting", name, "to", value);
		this[name] = value;
		if(this.subscribers[name]){
			for(var i =0;i<this.subscribers[name].length;i++) {
				this.subscribers[name][i]();
			}
		}
	}

	onChange(name, callback){

		if(this.subscribers[name]==null) {
			this.subscribers[name] = [];
		} 
		this.subscribers[name].push(callback);
	}


}
