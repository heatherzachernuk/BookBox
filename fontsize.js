var width = 300;
var height = 400;
var fontsize = 150;
var addBreakArray = [];
var textHeight = 0;

var canvas = document.getElementById("text");
ctx = canvas.getContext("2d");
ctx.fillStyle = "gray";
ctx.fillRect(0, 0, width, height);

var input = document.getElementById("input");
var submit = document.getElementById("submit");
submit.addEventListener("click", event => addText(event), false);

function addText(event){
  wordsArray = input.value.split(' ');
  measureWidth();  
}

function measureWidth(){
  debugger;
  var accumulator = 0;
  ctx.font = fontsize + "px Arial";
  console.log("fontsize", fontsize);
  for(i=0; i<wordsArray.length; i++){
    var wordWidth = ctx.measureText(wordsArray[i]+" ").width;
    if(accumulator + wordWidth > width){
      addBreakArray.push("~");
      textHeight += fontsize;
      console.log(textHeight);
      accumulator = wordWidth;
    }
    else {
      accumulator += wordWidth;
    } addBreakArray.push(wordsArray[i]);
  }
  addBreakArray.push("~");
  textHeight += fontsize;
  console.log(i, "Text Height", textHeight);
  console.log(i, "fontsize", fontsize);
  measureHeight();
}

function measureHeight(){
  if(textHeight > height*0.75){
    debugger;
    fontsize = fontsize * 0.9; 
    console.log("font size", fontsize);
    textHeight = 0; 
    addBreakArray = [];
    measureWidth();
  }
  else {
    renderText();
  }
  // console.log("Text Height", textHeight);  
  // console.log(addBreakArray);
  // renderText();
}

function renderText(){
  var y = fontsize;
  ctx.fillStyle = "red";
  ctx.textBaseline = "bottom";
  var lineArray = [];
  for(j=0; j<addBreakArray.length; j++){
    if(addBreakArray[j] === "~"){
      ctx.fillText(lineArray.join(' '), 0, y);
      y += fontsize;
      lineArray = [];
    }    
    else {
      lineArray.push(addBreakArray[j]);        
    }
  }
}