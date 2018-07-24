class TextureRenderer{
		constructor(){
			this.front = document.getElementById("front");
			this.back = document.getElementById("back");
			this.topp = document.getElementById("topp");
			this.bottom = document.getElementById("bottom");
			this.spine = document.getElementById("spine");
			this.edge = document.getElementById("edge");
	
			this.frontCtx = this.front.getContext("2d");
			this.backCtx = this.back.getContext("2d");
			this.spineCtx = this.spine.getContext("2d");
			this.imageWidth;
			this.imageHeight;
			this.leftMargin = 0;
			this.topMargin = 0;

			this.drawCanvases();
		}

	drawCover(){
		if(imageMenu.coverImage == "not loaded"){
			// console.log("no cover image");
			this.frontCtx.fillStyle = "#838c36";
			this.frontCtx.fillRect(0, 0, width, height);
			this.frontCtx.fillStyle = "#ffffff";
			this.frontCtx.font = "10px" + currentFont;
			this.frontCtx.fillText("Little House on the Poorie", 10, 30);
	}
		else {
			// frontCtx.fillStyle = "#838c36";
			// frontCtx.fillRect(0, 0, width, height);
			}
	}

	imageFit(){
		var boxAspect = width/height;
		var imageAspect = image.width/image.height;
	   // if the box front is proportionally taller and thinner than the cover image,
	   // we need a margin at the top, and the image to be the width of the box front
		if(boxAspect < imageAspect){
			this.imageWidth = width;
			this.imageHeight = width/imageAspect;
			this.topMargin = (height - this.imageHeight)/2;
			this.leftMargin = 0;
		}
		else if(boxAspect >= imageAspect){
			this.imageWidth = height * imageAspect;
			this.imageHeight = height;
			this.leftMargin = (width - this.imageWidth)/2;
			this.topMargin = 0;	
		}
		this.drawCover();
		this.frontCtx.drawImage(image, this.leftMargin, this.topMargin, this.imageWidth, this.imageHeight);
		threeD.resetView();
	}


	onColorsChanged(backgroundColor, detailColor, stripes){
	// debugger;
		this.frontCtx.fillStyle = backgroundColor;
		this.backCtx.fillStyle = backgroundColor;
		this.spineCtx.fillStyle = backgroundColor;
		this.frontCtx.fillRect(0, 0, width, height);
		this.backCtx.fillRect(0, 0, width, height);
	  	this.spineCtx.fillRect(0, 0, width, height);
	  	
	  	this.imageFit();
	}

	drawCanvases() {
	this.front.width = width;
	this.front.height = height;

	this.drawCover();

	// drawing spine canvas
	this.spine.width = depth;
	this.spine.height = height;

	this.spineCtx.fillStyle = "#5b631b";
	this.spineCtx.fillRect(0, 0, depth, height);

	this.spineCtx.save();
	this.spineCtx.translate(depth, 0);
	this.spineCtx.rotate(Math.PI/2);
	this.spineCtx.font = "10px" + currentFont;
	this.spineCtx.fillStyle = "#ffffff";
	this.spineCtx.fillText("Little House on the Poorie", 10, 30);
	this.spineCtx.restore();
	this.spineCtx.fillStyle = "#ffffff";
	this.spineCtx.fillText("Laura Ingalls", 10, (height/10)*9);

	// drawing back canvas
	this.back.width = width;
	this.back.height = height;

	this.backCtx.fillStyle = "#838c36";
	this.backCtx.fillRect(0, 0, width, height);

	// drawing top canvas
	this.topp.width = width;
	this.topp.height = 3;

	var topCtx = topp.getContext("2d");
	var endGradient = topCtx.createLinearGradient(width, 0, width, 3);
	  endGradient.addColorStop(0, 'rgb(211, 218, 209)');
	  endGradient.addColorStop(1, 'rgb(190, 173, 121)');
	  topCtx.fillStyle = endGradient;
	  topCtx.fillRect(0, 0, width, 3);
	var endPattern = topCtx.createPattern(topp, "repeat");

	  topp.width = width;
	  topp.height = depth;
	  topCtx.fillStyle = endPattern;
	  topCtx.fillRect(0, 0, width, depth);

	 // drawing bottom canvas
	var bottomCtx = bottom.getContext("2d");
	 this.bottom.width = width;
	 this.bottom.height = depth;
	  bottomCtx.fillStyle = endPattern;
	  bottomCtx.fillRect(0, 0, width, depth);

	// drawing edge canvas
	this.edge.width = 3;
	this.edge.height = height;

	var edgeCtx = this.edge.getContext("2d");
	var edgeGradient = edgeCtx.createLinearGradient(0, height, 3, height);
	  edgeGradient.addColorStop(0, 'rgb(211, 218, 209)');
	  edgeGradient.addColorStop(1, 'rgb(190, 173, 121)');
	  edgeCtx.fillStyle = edgeGradient;
	  edgeCtx.fillRect(0, 0, 3, height);
	var edgePattern = edgeCtx.createPattern(edge, "repeat");
	  edge.width = depth;
	  edge.height = height;
	  edgeCtx.fillStyle = edgePattern;
	  edgeCtx.fillRect(0, 0, depth, height);
}

	drawCover(){
		if(imageMenu.coverImage == "not loaded"){
			// console.log("no cover image");
			this.frontCtx.fillStyle = "#838c36";
			this.frontCtx.fillRect(0, 0, width, height);
			this.frontCtx.fillStyle = "#ffffff";
			this.frontCtx.font = "10px" + currentFont;
			this.frontCtx.fillText("Little House on the Poorie", 10, 30);
		}
		else {
			// frontCtx.fillStyle = "#838c36";
			// frontCtx.fillRect(0, 0, width, height);
		}
	}  

}  
