class WordcountMenu{
	constructor(){
		this.countInput = document.getElementById("count-input");
		this.getCount = document.getElementById("get-count");
		this.getCount.addEventListener("click", event => this.adjust(event), false);
 	}

 	adjust(event){
 		var wordcount = this.countInput.value;
 		var height = config.height;
 		height = (height * Math.log(wordcount)/Math.log(100000) - height) * 2 + height;
  		config.set("height", height);
  		var depth = config.depth;
  		depth = (depth * Math.log(wordcount)/Math.log(100000) - depth) * 2 + depth;
  		config.set("depth", depth);
 	}
}