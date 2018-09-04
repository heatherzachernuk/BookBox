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

var countInput = document.getElementById("count-input");
var titleInput = document.getElementById("title-input");
var authorInput = document.getElementById("author-input");

countInput.addEventListener("focusin", focusInput, false);
titleInput.addEventListener("focusin", focusInput, false);
authorInput.addEventListener("focusin", focusInput, false);


function focusInput(){
	// && window.screen.orientation.type != "landscape-primary"
	if(document.body.clientWidth <= 768 && window.screen.orientation.type === "portrait-primary"){
		console.log(window.screen.orientation.type);
		console.log(document.body.clientWidth);
		document.getElementById("upper").style.display = "none";
		document.getElementById("lower").style.height = "100%";
		document.getElementById("lower").style.width = "100%";
		titleInput.addEventListener("focusout", unfocusInput, false);
		authorInput.addEventListener("focusout", unfocusInput, false);
		countInput.addEventListener("focusout", unfocusInput, false);
	}
}

function unfocusInput(){
	document.getElementById("upper").style.display = "inline-block";
	document.getElementById("lower").style.height = "50%";
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


