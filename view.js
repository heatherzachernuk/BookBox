// MAIN MENU VARIABLES
var upper = document.getElementById("upper");

var menuArray = Array.from(document.querySelectorAll(".menu"));
var openerArray = Array.from(document.querySelectorAll("[data-opens]"));

// TEXT MENU VARIABLES
// COLOR MENU VARIABLES
// IMAGE MENU VARIABLES
var image = document.getElementById("image");

// WORDCOUNT MENU VARIABLES

var width = 150;

// canvas variables

// 3D MODEL VARIABLES

// EVENT LISTENERS
openerArray.forEach(opener=>opener.addEventListener("click", showMenu, false));

// **MAIN MENU FUNCTIONS**
function showMenu(event){
	var targetId = event.target.getAttribute("data-opens");
	var menuToShow = document.getElementById(targetId);
	menuArray.forEach(menu=>menu.style.display = "none");
	menuToShow.style.display = "block";
}

// **TEXT MENU FUNCTIONS**

// **COLOR MENU FUNCTIONS**

// **CANVAS DRAWING FUNCTIONS**

// **IMAGE MENU FUNCTIONS**

var config = new Config();

image.onload = function(){
	textureRenderer.imageFit();
};

var imageMenu = new ImageMenu(image);

var textMenu = new TextMenu();	

var colorMenu = new ColorMenu();

var wordcountMenu = new WordcountMenu();

var textureRenderer = new TextureRenderer();


// instantiates a 3D 
var threeD = new ThreeD(textureRenderer);


