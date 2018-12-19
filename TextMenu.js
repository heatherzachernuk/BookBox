class TextMenu{
	constructor(changeListener){

		this.changeListener = changeListener;
		this.titleInput = document.getElementById("title-input");
		this.authorInput = document.getElementById("author-input");
		this.addText = document.getElementById("add-text");
		this.fontButton = document.getElementById("font-button");
		this.fontList = document.getElementById("font-list");
		
		this.fontClick = this.fontList.addEventListener("click", event => this.changeFont(event), false);

		this.addText.addEventListener("click", event => this.changeText(event), false);
	}

	changeFont(fontClick){
		config.set("font", fontClick.target.id);
	}

	changeText(event){
		config.set("titleText", this.titleInput.value);
		config.set("authorText", this.authorInput.value);
	}
}