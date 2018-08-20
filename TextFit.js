textFit(){
	var fontSize = config.depth/2;
	var wordsArray = config.titleText.split(" ");
	var breakArray = [];
	var textHeight = 0;

	const measureWidth =() =>{
		var accumulator = 0;
		this.frontCtx.font = fontSize + "px " + config.font;
		for(var i=0; i<wordsArray.length; i++){
			var wordWidth = this.frontCtx.measureText(wordsArray[i]+" ").width;
			while(wordWidth > width*0.85){
				fontSize *= 0.9;
				this.frontCtx.font = fontSize + "px " + config.font;
				wordWidth = this.frontCtx.measureText(wordsArray[i]+" ").width;
			}
			if(accumulator + wordWidth > width*0.85){
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
		if(textHeight > config.height * 0.75){
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
		console.log(breakArray);
		var y = fontSize + config.height*0.1;
		this.frontCtx.fillStyle = config.detailColor;
		this.frontCtx.textBaseline = bottom;
		var lineArray = [];
		for(var j=0; j<breakArray.length; j++){
			if(breakArray[j] === "~"){
				this.frontCtx.fillText(lineArray.join(' '), width*0.1, y);
				y += fontSize;
				lineArray = [];
			}
			else {
				lineArray.push(breakArray[j]);  
			}
		} authorFit();
	}

	const authorFit = ()=> {
		this.frontCtx.font = fontSize + "px " + config.font;
		var wordWidth = this.frontCtx.measureText(config.authorText).width;
		while(wordWidth > width*0.85){
			fontSize *= 0.9;
			this.frontCtx.font = fontSize + "px " + config.font;
			wordWidth = this.frontCtx.measureText(config.authorText).width;
		}
		this.frontCtx.fillStyle = config.detailColor;
		this.frontCtx.textBaseline = bottom;
		this.frontCtx.fillText(config.authorText, width*0.1, config.height*0.9);
	}

	measureWidth();

	}
}