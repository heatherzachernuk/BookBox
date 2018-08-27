var upper = document.getElementById("upper");
var menuArray = Array.from(document.querySelectorAll(".menu"));
var openerArray = Array.from(document.querySelectorAll("[data-opens]"));
var image = document.getElementById("image");
var width = 150;

openerArray.forEach(opener=>opener.addEventListener("click", showMenu, false));

function showMenu(event){
	var targetId = event.target.getAttribute("data-opens");
	var menuToShow = document.getElementById(targetId);
	menuArray.forEach(menu=>menu.style.display = "none");
	menuToShow.style.display = "block";
	config.set("currentMenu", targetId);
}

var config = new Config();

image.onload = function(){
	textureRenderer.imageFit();
};

var imageMenu = new ImageMenu(image);

var textMenu = new TextMenu();	

var colorMenu = new ColorMenu();

var wordcountMenu = new WordcountMenu();

var textureRenderer = new TextureRenderer();

var threeD = new ThreeD(textureRenderer);


