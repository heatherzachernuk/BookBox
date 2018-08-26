class TextureRenderer{
	constructor(){
		this.front = document.getElementById("front");
		this.front.width = width;
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

		config.onChange("depth", ()=> {this.onCoverDetailChanged()});
		config.onChange("coverImage", ()=> {this.onCoverDetailChanged()});
		config.onChange("backgroundColor", ()=> {this.onCoverDetailChanged()});
		config.onChange("detailColor", ()=> {this.onCoverDetailChanged()});
		config.onChange("font", ()=> {this.onCoverDetailChanged()});
		config.onChange("titleText", ()=> {this.onCoverDetailChanged()});
		config.onChange("authorText", ()=> {this.onCoverDetailChanged()});
		config.onChange("stripes", ()=> {this.onCoverDetailChanged()});
	}

	drawCanvases() {
		this.drawFront();
		this.drawBack();
		this.drawSpine();
		this.drawEnds();
		this.drawEdge();
		this.drawStripes();
	}

	onCoverDetailChanged(){
		this.drawFront();
		this.drawBack();
		this.drawSpine();
		this.drawStripes();
	}

	imageFit(){
		console.log("drawing");
		var boxAspect = width/config.height;
		var imageAspect = image.width/image.height;
	   // if the box front is proportionally taller and thinner than the cover image,
	   // we need a margin at the top, and the image to be the width of the box front
		if(boxAspect < imageAspect){
			this.imageWidth = width;
			this.imageHeight = width/imageAspect;
			this.topMargin = (config.height - this.imageHeight)/2;
			this.leftMargin = 0;
			if(this.imageHeight > config.height*9/10){
				console.log(this.imageHeight);
				this.frontCtx.fillStyle = config.backgroundColor;
				this.frontCtx.fillRect(0, 0, width, config.height);
			}
		}
		else if(boxAspect >= imageAspect){
			this.imageWidth = config.height * imageAspect;
			this.imageHeight = config.height;
			this.leftMargin = (width - this.imageWidth)/2;
			this.topMargin = 0;	
			this.frontCtx.fillStyle = config.backgroundColor;
			this.frontCtx.fillRect(0, 0, width, config.height);
		}
		this.drawStripes();
		this.frontCtx.drawImage(image, this.leftMargin, this.topMargin, this.imageWidth, this.imageHeight);
	}

	drawFront(){
			this.front.height = config.height;
			this.frontCtx.fillStyle = config.backgroundColor;
			this.frontCtx.fillRect(0, 0, width, config.height);
		if(config.coverImage === false){
			// add the title to the front
			this.textFit(config.titleText, this.frontCtx, width, config.height, width*0.1, config.height*0.15);
			this.frontAuthorFit();
		}
		else {
			// add the cover image to the front
			this.imageFit();
		}
	}

	textFit(sourceText, context, boundingWidth, boundingHeight, xLocation, yLocation){
		var fontSize = config.depth;
		var wordsArray = sourceText.split(" ");
		var breakArray = [];
		var textHeight = 0;

		const measureWidth =() =>{
			var accumulator = 0;
			context.font = fontSize + "px " + config.font;
			for(var i=0; i<wordsArray.length; i++){
				var wordWidth = context.measureText(wordsArray[i]+" ").width;
				while(wordWidth > boundingWidth*0.85){
					fontSize *= 0.9;
					context.font = fontSize + "px " + config.font;
					wordWidth = context.measureText(wordsArray[i]+" ").width;
				}
				if(accumulator + wordWidth > boundingWidth*0.85){
					breakArray.push("~");
					textHeight += fontSize;
					accumulator = wordWidth;
				}
				else {
					accumulator += wordWidth; 
				}
				breakArray.push(wordsArray[i]);
			}
			breakArray.push("~");
			textHeight += fontSize;
			measureHeight();
		}

		const measureHeight = ()=>{
			if(textHeight > boundingHeight * 0.7){
				fontSize *= 0.9; 
				textHeight = 0;
				breakArray = [];
				measureWidth();
			}
			else {
				renderTitle();
			}
		}

		const renderTitle = ()=>{
			var y = yLocation;
			context.fillStyle = config.detailColor;
			context.textBaseline = "middle";
			var lineArray = [];
			for(var j=0; j<breakArray.length; j++){
				if(breakArray[j] === "~"){
					context.fillText(lineArray.join(' '), xLocation, y);
					y += fontSize;
					lineArray = [];
				}
				else {
					lineArray.push(breakArray[j]);  
				}
			} 
		}
		measureWidth();
	}

	frontAuthorFit() {
		var fontSize = config.depth/2.5;
		this.frontCtx.font = fontSize + "px " + config.font;
		var wordWidth = this.frontCtx.measureText(config.authorText).width;
		while(wordWidth > width*0.85){
			fontSize *= 0.9;
			this.frontCtx.font = fontSize + "px " + config.font;
			wordWidth = this.frontCtx.measureText(config.authorText).width;
		}
		this.frontCtx.fillStyle = config.detailColor;
		this.frontCtx.textBaseline = bottom;
		this.frontCtx.fillText(config.authorText, width*0.1, config.height*0.85);
	}


	drawSpine(){
		// drawing spine canvas
		this.spine.width = config.depth;
		this.spine.height = config.height;
		this.spineCtx.fillStyle = config.backgroundColor;
		this.spineCtx.fillRect(0, 0, config.depth, config.height);
		this.spineCtx.save();
		this.spineCtx.translate(config.depth, 0);
		this.spineCtx.rotate(90 * Math.PI / 180);
		this.textFit(config.titleText, this.spineCtx, config.height*0.85, config.depth/2, config.height*0.1, config.depth/2);
		this.spineCtx.restore();
		this.spineCtx.translate(config.depth/2, 0);
		this.spineCtx.textAlign = "center";
		this.textFit(config.authorText, this.spineCtx, config.depth, config.height/8, 0, config.height*0.85);
		this.spineCtx.translate(-config.depth/2, 0);
	}


	drawBack(){
		// drawing back canvas
		this.back.width = width;
		this.back.height = config.height;

		this.backCtx.fillStyle = config.backgroundColor;
		this.backCtx.fillRect(0, 0, width, config.height);
	}

	drawEdge(){
		var edgeCtx = this.edge.getContext("2d");

		// creating the pattern
		this.edge.width = 3;
		var edgeGradient = edgeCtx.createLinearGradient(0, config.height, 3, config.height);
		edgeGradient.addColorStop(0, 'rgb(211, 218, 209)');
		edgeGradient.addColorStop(1, 'rgb(190, 173, 121)');
		edgeCtx.fillStyle = edgeGradient;
		edgeCtx.fillRect(0, 0, 3, config.height);
		var edgePattern = edgeCtx.createPattern(edge, "repeat");
		
		// applying the pattern
		this.edge.width = config.depth;
		this.edge.height = config.height;
		edgeCtx.fillStyle = edgePattern;
		edgeCtx.fillRect(0, 0, config.depth, config.height);	
	}

	drawEnds(){
		var topCtx = topp.getContext("2d");
		var bottomCtx = bottom.getContext("2d");

		// creating the pattern
		this.topp.height = 3;
		var endGradient = topCtx.createLinearGradient(width, 0, width, 3);
		endGradient.addColorStop(0, 'rgb(211, 218, 209)');
		endGradient.addColorStop(1, 'rgb(190, 173, 121)');
		topCtx.fillStyle = endGradient;
		topCtx.fillRect(0, 0, width, 3);
		var endPattern = topCtx.createPattern(topp, "repeat");

		var addPattern = (canvas, ctx)=> {
			canvas.width = width;
			canvas.height = config.depth;
			ctx.fillStyle = endPattern;
			ctx.fillRect(0, 0, width, config.depth);
		}
		// applying the pattern to the top and bottom
		addPattern(this.bottom, bottomCtx);
		addPattern(this.topp, topCtx);
	}

	drawStripes(){
		if(config.stripes == true){
			var drawToContext = (ctx, width)=> {
				ctx.beginPath();
				var drawLines = (end)=> {
					ctx.moveTo(0, end);
					ctx.lineTo(width, end);	
				}
				drawLines((config.height/10)*0.3);
				drawLines((config.height/10)*0.5)
				drawLines((config.height/10)*9.5)
				drawLines((config.height/10)*9.7)
				ctx.strokeStyle = config.detailColor;
				ctx.lineWidth = 1;
				ctx.stroke();
			}
			drawToContext(this.spineCtx, config.depth);
			drawToContext(this.backCtx, width);
			if(this.imageHeight < config.height*9/10 || !this.coverImage){
				drawToContext(this.frontCtx, width);
			}
			// threeD.resetView();
		} 
		else {
			this.drawFront();
			this.drawBack();
			this.drawSpine();
			threeD.resetView();
		} 
	}
}  
