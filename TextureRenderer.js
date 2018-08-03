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

		config.onChange("backgroundColor", ()=> {this.onCoverDetailChanged()})
		config.onChange("detailColor", ()=> {this.onCoverDetailChanged()})
		config.onChange("font", ()=> {this.drawFront(), this.drawSpine()});
		config.onChange("titleText", ()=> {this.drawFront(), this.drawSpine()});
		config.onChange("authorText", ()=> {this.drawFront(), this.drawSpine()});
		config.onChange("stripes", ()=> {this.onCoverDetailChanged()});
		config.onChange("height", ()=> {this.drawCanvases()});
	}

	drawCanvases() {
		this.front.height = config.height;
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
	}

	imageFit(){
		var boxAspect = width/config.height;
		var imageAspect = image.width/image.height;
	   // if the box front is proportionally taller and thinner than the cover image,
	   // we need a margin at the top, and the image to be the width of the box front
		if(boxAspect < imageAspect){
			this.imageWidth = width;
			this.imageHeight = width/imageAspect;
			this.topMargin = (config.height - this.imageHeight)/2;
			this.leftMargin = 0;
		}
		else if(boxAspect >= imageAspect){
			this.imageWidth = config.height * imageAspect;
			this.imageHeight = config.height;
			this.leftMargin = (width - this.imageWidth)/2;
			this.topMargin = 0;	
		}
		this.frontCtx.drawImage(image, this.leftMargin, this.topMargin, this.imageWidth, this.imageHeight);
		threeD.resetView();
	}

	drawFront(){
			this.frontCtx.fillStyle = config.backgroundColor;
			this.frontCtx.fillRect(0, 0, width, config.height);
		if(config.coverImage == false){
			// add the title to the front
			this.frontCtx.fillStyle = config.detailColor;
			this.frontCtx.font = "10px " + config.font;
			this.frontCtx.fillText(config.titleText, 10, 30);
		}
		else {
			// add the cover image to the front
			this.imageFit();
		}
	}
 
	drawSpine(){
		// drawing spine canvas
		this.spine.width = config.depth;
		this.spine.height = config.height;
		this.spineCtx.fillStyle = config.backgroundColor;
		this.spineCtx.fillRect(0, 0, config.depth, config.height);
		this.spineCtx.save();
		this.spineCtx.translate(config.depth, 0);
		// rotates for vertical spine text
		this.spineCtx.rotate(Math.PI/2);
		this.spineCtx.fillStyle = config.detailColor;
		this.spineCtx.font = "10px " + config.font;
		this.spineCtx.fillText(config.titleText, (config.height/10)*1, (config.depth/2+config.depth/20));
		this.spineCtx.restore();
		this.spineCtx.fillStyle = config.detailColor;
		this.spineCtx.font = "10px " + config.font;
		this.spineCtx.fillText(config.authorText, 10, (config.height/10)*8);
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

		// applying the pattern to the top and bottom
		var addPattern = (canvas, ctx)=> {
			canvas.width = width;
			canvas.height = config.depth;
			ctx.fillStyle = endPattern;
			ctx.fillRect(0, 0, width, config.depth);
		}
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
			drawToContext(this.frontCtx, width);
			drawToContext(this.backCtx, width);
		} else {
			this.drawFront();
			this.drawBack();
			this.drawSpine();
		} 
	}
}  
