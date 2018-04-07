var mainMenu = document.getElementById("main-menu");

var textMenuSelect = document.getElementById("text-button");
var colorMenuSelect = document.getElementById("color-button");
var imageMenuSelect = document.getElementById("image-button");
var wordcountMenuSelect = document.getElementById("wordcount-button");

var textMenu = document.getElementById("text-menu");
var colorMenu = document.getElementById("color-menu");
var imageMenu = document.getElementById("image-menu");
var wordcountMenu = document.getElementById("wordcount-menu");

textMenuSelect.addEventListener("click", loadTextMenu, false);
colorMenuSelect.addEventListener("click", loadColorMenu, false);
imageMenuSelect.addEventListener("click", loadImageMenu, false);
wordcountMenuSelect.addEventListener("click", loadWordcountMenu, false);

function loadTextMenu(){
	mainMenu.setAttribute("style", "display:none");
	textMenu.setAttribute("style", "display:block");
}

function loadColorMenu(){
	mainMenu.setAttribute("style", "display:none");
	colorMenu.setAttribute("style", "display:block");
}

function loadImageMenu(){
	mainMenu.setAttribute("style", "display:none");
	imageMenu.setAttribute("style", "display:block");
}

function loadWordcountMenu(){
	mainMenu.setAttribute("style", "display:none");
	wordcountMenu.setAttribute("style", "display:block");
}