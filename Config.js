class Config{
	constructor(){
		this.backgroundColor = "red";
		this.detailColor = "black";
		this.titleText = "The Englishman Who Went Up a Hill and Came Down a Poorie";
		this.authorText = "Brad Bird Ingalls";
		this.font = "Arial";
		this.height = 200;
		this.depth = 50;
		this.coverImage = false;
		this.stripes = true;
		this.frontStripes = true;
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