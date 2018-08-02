class ImageMenu {
	constructor(image){

	this.takePhotoButton = document.getElementById("take-photo");
	this.coverFileButton = document.getElementById("cover-file");
	this.currentFilename = document.getElementById("current-filename");
	this.file;
	this.image = image;
	
	this.takePhotoButton.addEventListener("change", event => this.loadCover(event));
	this.coverFileButton.addEventListener("change", event => this.loadCover(event));

}

	loadCover(changeEvent){
		this.file = changeEvent.target.files[0];
		var reader = new FileReader();
		reader.addEventListener("load", event => this.onCoverFileLoaded(event));
		reader.readAsDataURL(this.file); 
	}

	onCoverFileLoaded(fileLoadEvent){
		this.image.src = fileLoadEvent.target.result;
		this.currentFilename.innerHTML = this.file.name;
		config.coverImage = true;
	}
	
}