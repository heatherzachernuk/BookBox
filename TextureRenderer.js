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

		config.onChange("backgroundColor", ()=> {this.onBackgroundColorChanged(), this.imageFit()})
		config.onChange("detailColor", ()=> {this.drawCover(), this.drawSpine()})
		config.onChange("font", ()=> {this.drawCover(), this.drawSpine()});
		config.onChange("titleText", ()=> {this.drawCover(), this.drawSpine()});
		config.onChange("authorText", ()=> {this.drawCover(), this.drawSpine()});
	}

	drawCover(){
		if(config.coverImage == false){
			// console.log("no cover image");
			this.frontCtx.fillStyle = config.backgroundColor;
			this.frontCtx.fillRect(0, 0, width, height);
			this.frontCtx.fillStyle = config.detailColor;
			this.frontCtx.font = "10px " + config.font;
			this.frontCtx.fillText(config.titleText, 10, 30);
		}
		else {
			this.frontCtx.fillStyle = config.backgroundColor;
			this.frontCtx.fillRect(0, 0, width, height);
			this.imageFit();
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
		this.frontCtx.drawImage(image, this.leftMargin, this.topMargin, this.imageWidth, this.imageHeight);
		threeD.resetView();
	}

	onBackgroundColorChanged(){
		this.frontCtx.fillStyle = config.backgroundColor;
		this.backCtx.fillStyle = config.backgroundColor;
		this.spineCtx.fillStyle = config.backgroundColor;
		this.frontCtx.fillRect(0, 0, width, height);
		this.backCtx.fillRect(0, 0, width, height);
	  	this.spineCtx.fillRect(0, 0, width, height);
	}

	drawCanvases() {
		this.front.width = width;
		this.front.height = height;

		this.drawCover();
		this.drawSpine();
		this.drawBack();
		this.drawEnds();
		this.drawEdge();
	}

	drawSpine(){
		// drawing spine canvas
		this.spine.width = depth;
		this.spine.height = height;

		this.spineCtx.fillStyle = config.backgroundColor;
		this.spineCtx.fillRect(0, 0, depth, height);

		this.spineCtx.save();
		this.spineCtx.translate(depth, 0);
		this.spineCtx.rotate(Math.PI/2);
		this.spineCtx.fillStyle = config.detailColor;
		this.spineCtx.font = "10px " + config.font;
		this.spineCtx.fillText(config.titleText, 10, 30);
		this.spineCtx.restore();
		this.spineCtx.fillStyle = config.detailColor;
		this.spineCtx.font = "10px " + config.font;
		this.spineCtx.fillText(config.authorText, 10, (height/10)*9);
	}

	drawBack(){
		// drawing back canvas
		this.back.width = width;
		this.back.height = height;

		this.backCtx.fillStyle = config.backgroundColor;
		this.backCtx.fillRect(0, 0, width, height);
	}

	drawEdge(){
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

	drawEnds(){
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
	}

}  
