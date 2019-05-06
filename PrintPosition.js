class PrintPosition {
    constructor() {
        this.front = document.getElementById("front");
        this.back = document.getElementById("back");
        this.topp = document.getElementById("topp");
        this.bottom = document.getElementById("bottom");
        this.spine = document.getElementById("spine");
        
        this.edge = document.getElementById("edge");

        this.topInsert = document.getElementById("top-insert-tab");
        this.spineLeft = document.getElementById("spine-left-tab");
        // find out why this height was not as expected
        this.spineLeft.height = config.height;
        this.bottomLeft = document.getElementById("bottom-left-tab");
        this.bottomRight = document.getElementById("bottom-right-tab");
        this.bottomBase = document.getElementById("bottom-base-tab");

        this.topInsertCtx = this.topInsert.getContext("2d");
        this.spineLeftCtx = this.spineLeft.getContext("2d");
        this.bottomLeftCtx = this.bottomLeft.getContext("2d");
        this.bottomRightCtx = this.bottomRight.getContext("2d");
        this.bottomBaseCtx = this.bottomBase.getContext("2d");

        this.tabWidth;

        this.drawTabs();
        this.positionCanvases();
    }

    positionCanvases() {
        this.tabWidth = 30;
        // box sides positions
        this.topp.style.top = this.tabWidth + "px";
        this.topp.style.left = this.tabWidth + config.depth + "px";
        this.spine.style.top = config.depth + this.tabWidth + "px";
        this.spine.style.left = this.tabWidth + "px";
        this.front.style.top = config.depth + this.tabWidth + "px";
        this.front.style.left = this.tabWidth + config.depth + "px";
        this.edge.style.top = config.depth + this.tabWidth + "px";
        this.edge.style.left = this.tabWidth + config.depth + width + "px";
        this.back.style.top = this.tabWidth + config.depth + "px";
        this.back.style.left = this.tabWidth + (config.depth*2) + width + "px";
        this.bottom.style.top = this.tabWidth + config.depth + config.height + "px";
        this.bottom.style.left = this.tabWidth + config.depth + "px";
        // tab positions
        this.topInsert.style.left = config.depth + this.tabWidth + "px";
        this.spineLeft.style.top = config.depth + this.tabWidth + "px";
        this.bottomLeft.style.top = config.depth + config.height + this.tabWidth + "px";
        this.bottomLeft.style.left = config.depth + "px";
        this.bottomRight.style.top = config.depth + config.height + this.tabWidth + "px";
        this.bottomRight.style.left = config.depth + width + this.tabWidth + "px";
        this.bottomBase.style.top = (config.depth*2) + config.height + this.tabWidth + "px";
        this.bottomBase.style.left = config.depth + this.tabWidth  + "px";
    }

    drawTabs(){
        this.tabWidth = 30;
        this.tabFill = config.backgroundColor;
        this.topInsertTab();
        this.spineLeftTab();
        this.bottomLeftTab();
        this.bottomRightTab();
        this.bottomBaseTab();
    }

    topInsertTab(){
        this.topInsertCtx.beginPath();
        this.topInsertCtx.moveTo(this.tabWidth/2, 0);
        this.topInsertCtx.lineTo(width-this.tabWidth/2, 0);
        this.topInsertCtx.lineTo(width, this.tabWidth);
        this.topInsertCtx.lineTo(0, this.tabWidth);
        this.topInsertCtx.fillStyle = this.tabFill;
		this.topInsertCtx.fill();
    }

    spineLeftTab(){
        this.spineLeftCtx.beginPath();
        this.spineLeftCtx.moveTo(this.tabWidth, 0);
        this.spineLeftCtx.lineTo(this.tabWidth, config.height);
        this.spineLeftCtx.lineTo(0, config.height-this.tabWidth/2);
        this.spineLeftCtx.lineTo(0, this.tabWidth/2);
        this.spineLeftCtx.fillStyle = this.tabFill;
        this.spineLeftCtx.fill();
    }

    bottomLeftTab(){
        this.bottomLeftCtx.beginPath();
        this.bottomLeftCtx.moveTo(0, this.tabWidth/2);
        this.bottomLeftCtx.lineTo(this.tabWidth, 0);
        console.log(this.tabWidth, config.depth);
        this.bottomLeftCtx.lineTo(this.tabWidth, config.depth);
        this.bottomLeftCtx.lineTo(0,(config.depth-this.tabWidth/2));
        this.bottomLeftCtx.lineTo(0, this.tabWidth);
        this.bottomLeftCtx.fillStyle = this.tabFill;
        this.bottomLeftCtx.fill();
        // this.bottomLeftCtx.stroke();
    }
    bottomRightTab(){
        this.bottomRightCtx.beginPath();
        this.bottomRightCtx.lineTo(this.tabWidth, this.tabWidth/2);
        this.bottomRightCtx.lineTo(this.tabWidth, config.depth-this.tabWidth/2);
        this.bottomRightCtx.lineTo(0, config.depth);
        this.bottomRightCtx.lineTo(0,0);
        this.bottomRightCtx.fillStyle = this.tabFill;
        this.bottomRightCtx.fill();
    }

    bottomBaseTab(){
        this.bottomBaseCtx.beginPath();
        this.bottomBaseCtx.lineTo(this.tabWidth/2, this.tabWidth);
        this.bottomBaseCtx.lineTo(width-this.tabWidth/2, this.tabWidth);
        this.bottomBaseCtx.lineTo(width, 0);
        this.bottomBaseCtx.lineTo(0, 0);
        this.bottomBaseCtx.fillStyle = this.tabFill;
        this.bottomBaseCtx.fill();
        }
    
}
