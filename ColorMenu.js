class ColorMenu {
	constructor(changeListener){
		this.changeListener = changeListener;
		this.backgroundColorButton = document.getElementById("background");
		this.detailColorButton = document.getElementById("set-color-box");
		this.setColorBox = document.getElementById("set-color-box");
		this.colorMode = "background";

		this.paletteButton = document.getElementById("palette-button");
		this.coverButton = document.getElementById("cover-color-button");
		this.colorSourceBox = document.getElementById("color-source-box");
		this.palettePicker = document.getElementById("palette-picker");
		this.brightness = document.getElementById("brightness");
		this.hue = document.getElementById("hue");
		this.currentColor = config.backgroundColor;
		this.imagePicker = document.getElementById("image-picker");

		this.stripesOn = document.getElementById("stripes-on");
		this.stripesOff = document.getElementById("stripes-off");
		this.stripesBox = document.getElementById("stripes-box"); 

		this.setColorBox.addEventListener("click", event=>this.setColorToggle(event), false);
		this.coverButton.addEventListener("click", event=>this.colorSourceToggle(event), false);
		this.paletteButton.addEventListener("click", event=>this.colorSourceToggle(event), false);
		this.brightness.addEventListener("click", event=>this.hidePickers(event), false);
		this.imagePicker.addEventListener("click", event=>this.hidePickers(event), false);

		this.stripesOn.addEventListener("click", event=>this.stripesToggle(event), false);
		this.stripesOff.addEventListener("click", event=>this.stripesToggle(event), false);

		config.onChange("currentMenu", event=>this.hidePickers());
	}

	setColorToggle(){
		if(this.colorMode === "background"){
			this.backgroundColorButton.style.backgroundColor = "#56A3A6";
			this.detailColorButton.style.backgroundColor = "#BCF8EC";
			this.colorMode = "detail";
		}
		else if(this.colorMode === "detail") {
			this.backgroundColorButton.style.backgroundColor = "#BCF8EC";
			this.detailColorButton.style.backgroundColor = "#56A3A6";
			this.colorMode = "background";
		}
	}

	colorSourceToggle(event){
		if(event.target.id == "palette-button"){
			this.paletteButton.style.backgroundColor = "#BCF8EC";
			this.colorSourceBox.style.backgroundColor = "#56A3A6";
			this.showPalette();
		}
		if(event.target.id == "cover-color-button") {
			if(config.coverImage == true){
				this.paletteButton.style.backgroundColor = "#56A3A6";
				this.colorSourceBox.style.backgroundColor = "#BCF8EC";
				this.showImage();
			}		
		}
	}

	stripesToggle(event){
		if(event.target.id === "stripes-on"){
			this.stripesOn.style.backgroundColor = "#BCF8EC";
			this.stripesBox.style.backgroundColor = "#56A3A6";
			config.set("stripes", true);
		}
		if(event.target.id === "stripes-off"){
			this.stripesOn.style.backgroundColor = "#56A3A6";
			this.stripesBox.style.backgroundColor = "#BCF8EC";
			config.set("stripes", false);
		}
	}

	showPalette(){
		this.palettePicker.style.display = "block";
		this.palettePicker.style.top = this.setColorBox.getBoundingClientRect().top + "px";
		this.palettePicker.style.left = this.setColorBox.getBoundingClientRect().left + "px";
		this.drawPalette();
		hue.addEventListener("mousemove", event=> this.pickColor(event, hue));
		brightness.addEventListener("mousemove", event=> this.pickColor(event, brightness));
		// this.palettePicker.addEventListener("mousemove", event=>this.pickPaletteColor(event));
	}

	showImage(){
		this.imagePicker.style.display = "block";
		// this.imagePicker.style.top = this.setColorBox.getBoundingClientRect().top + "px";
		// this.imagePicker.style.left = this.setColorBox.getBoundingClientRect().left + "px";
		var colorMenuPage = document.getElementById("color-menu");
		this.imagePicker.style.top = colorMenuPage.getBoundingClientRect().bottom - 10 - (image.height/image.width)*200 + "px";
		this.imagePicker.style.left = colorMenuPage.getBoundingClientRect().right - 210 + "px";
		var imageCtx = this.imagePicker.getContext("2d");
		imageCtx.drawImage(image, 0, 0, 200, (image.height/image.width)*200);
		this.imagePicker.addEventListener("mousemove", event=> this.pickImageColor(event));
	}

	hidePickers(){
		this.palettePicker.style.display = "none";
		this.imagePicker.style.display = "none";
	}

	drawPalette(){
		this.drawBright();
		this.drawHue();
	}

	drawBright(){
		var brightCtx = this.brightness.getContext("2d");
		var brightGradient = brightCtx.createLinearGradient(0, 0, 0, 200);
		brightGradient.addColorStop(0, "rgba(0,0,0,0)");
		brightGradient.addColorStop(1, "black");
		var colorGradient = brightCtx.createLinearGradient(0, 0, 200, 0);
		colorGradient.addColorStop(0, "white");
		colorGradient.addColorStop(1, this.currentColor);
		brightCtx.fillStyle = colorGradient;
		brightCtx.fillRect(0, 0, 200, 200);  
		brightCtx.fillStyle = brightGradient;
		brightCtx.fillRect(0, 0, 200, 200); 
	}

	drawHue(){
		var hueCtx = this.hue.getContext("2d");
		var hueGradient = hueCtx.createLinearGradient(0, 0, 0, 200);
		hueGradient.addColorStop(0/6, '#ff0000');
		hueGradient.addColorStop(1/6, '#ff8000'); 
		hueGradient.addColorStop(2/6, '#ffff00'); 
		hueGradient.addColorStop(3/6, '#00cc00'); 
		hueGradient.addColorStop(4/6, ' #0066ff'); 
		hueGradient.addColorStop(5/6, '#6600ff'); 
		hueGradient.addColorStop(6/6, '#ff00ff'); 
		hueCtx.fillStyle = hueGradient;
		hueCtx.fillRect(0, 0, 50, 200);
	}

	pickColor(color, element){
		element.style.cursor = "crosshair";
		var ctx = element.getContext("2d");
		var offsetX = element.getBoundingClientRect().left;
		var offsetY = element.getBoundingClientRect().top;
		var colorValue = ctx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
		var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')'; 
		if(element === hue){
			this.currentColor = rgba;
			this.drawBright();
		}
		if(element === brightness){
			this.updateColors(rgba);
		}
	}

	updateColors(rgba) {
		if(this.colorMode=="background") {
			config.set("backgroundColor", rgba);
		} else {
			config.set("detailColor", rgba);
		}
	}

	pickImageColor(color){
		this.imagePicker.style.cursor = "crosshair";
		var imageCtx = this.imagePicker.getContext("2d");
		var offsetX = this.imagePicker.getBoundingClientRect().left;
	  	var offsetY = this.imagePicker.getBoundingClientRect().top;
		var colorValue = imageCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
		var rgba = 'rgba(' +colorValue[0]+', '+colorValue[1]+', '+colorValue[2]+', '+(colorValue[3]/255)+')';
		this.updateColors(rgba);
	}
}
