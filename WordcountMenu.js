class WordcountMenu{
	constructor(){
		this.countInput = document.getElementById("count-input");
		this.getCount = document.getElementById("get-count");
		this.getCount.addEventListener("click", event => this.adjust(event), false);
 	}

 	adjust(event){
 		var wordcount = this.countInput.value;
 		console.log("the depth was", config.get('depth'));
 		const newDepth = (50 * Math.log(wordcount)/Math.log(100000) - 50) * 2 + 50;
 		console.log("and we'll make it", newDepth);
  		config.set("height", (200 * Math.log(wordcount)/Math.log(100000) - 200) * 2 + 200);
  		config.set("depth", newDepth);
 	}
}