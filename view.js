// MAIN MENU VARIABLES
var upper = document.getElementById("upper");

var menuArray = Array.from(document.querySelectorAll(".menu"));
var openerArray = Array.from(document.querySelectorAll("[data-opens]"));

// TEXT MENU VARIABLES
var titleInput = document.getElementById("title-input");
var authorInput = document.getElementById("author-input");
var addText = document.getElementById("add-text");
var fontButton = document.getElementById("font-button");
var fontList = document.getElementById("font-list");
var currentFont = "Arial";

// COLOR MENU VARIABLES


// IMAGE MENU VARIABLES
var image = document.getElementById("image");

// WORDCOUNT MENU VARIABLES
var countInput = document.getElementById("count-input");
var getCount = document.getElementById("get-count");

var exampleBox = document.getElementById("example-box");
var exampleTitle = document.getElementById("example-title");
var exampleAuthor = document.getElementById("example-author");

var width = 150;
var height = 200;
var depth = 50;

// canvas variables

// 3D MODEL VARIABLES
var threeD; 

// EVENT LISTENERS
openerArray.forEach(opener=>opener.addEventListener("click", showMenu, false));

addText.addEventListener("click", textOn, false);
var fontClick = fontList.addEventListener("click", changeFont, false);





// getCount.addEventListener("click", getDimensions, false);

//  **LOCAL STORAGE FUNCTIONS**
// var config = {};

// function saveConfig(){
//   console.log(":saving");
//   localStorage.setItem("configItem", JSON.stringify(config));
// }

// function loadConfig(){
//   var configText = localStorage.getItem("configItem");
//   if(configText != null){
//     config = JSON.parse(configText);
//     console.log(config);
//     titleInput.innerHTML = config.titleText;
//     authorInput.innerHTML = config.authorText;
//     countInput.innerHTML = config.wordCount;  
//     // is this necessary also? :
//     countInput.value = config.wordCount;  
//     titleInput.value = config.titleText;
//     authorInput.value = config.authorText;
//   }  
// }

// loadConfig();



// **MAIN MENU FUNCTIONS**
function showMenu(event){
	var targetId = event.target.getAttribute("data-opens");
	var menuToShow = document.getElementById(targetId);
	menuArray.forEach(menu=>menu.style.display = "none");
	menuToShow.style.display = "block";
}

// **TEXT MENU FUNCTIONS**
function changeFont(fontClick){
	currentFont = fontClick.target.id;
	frontTexture.needsUpdate = true;
	spineTexture.needsUpdate = true;
	bookBox.rotation.y = 0;
}

function textOn(){

}

// **COLOR MENU FUNCTIONS**

// **CANVAS DRAWING FUNCTIONS**


// **IMAGE MENU FUNCTIONS**
	image.onload = function(){
			textureRenderer.imageFit();
		};
	

var imageMenu = new ImageMenu(image);

var textureRenderer = new TextureRenderer();

var colorMenu = new ColorMenu(textureRenderer);


// this.callback(this.backgroundColorValue,this.detailColorValue, this.stripes);

// instantiates a 3D 
threeD = new ThreeD();


