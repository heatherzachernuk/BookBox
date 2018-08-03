class Config{
	constructor(){
		this.backgroundColor = "red";
		this.detailColor = "black";
		this.titleText = "Little House on the Poorie";
		this.authorText = "Laura Ingalls Wilder";
		this.font = "Arial";
		this.height = 200;
		this.depth = 50;
		this.coverImage = false;
		this.stripes = true;
		this.subscribers = {}; 
	}

	set(name, value){
		console.log("setting", name, "to", value);
		this[name] = value;
		if(this.subscribers[name]){
			this.subscribers[name]();
		}
	}

	onChange(name, callback){
		this.subscribers[name] = callback;
	}


}