var menuArray = Array.from(document.querySelectorAll(".menu"));
var openerArray = Array.from(document.querySelectorAll("[data-opens]"));

openerArray.forEach(opener=>opener.addEventListener("click", showMenu, false));

function showMenu(event){
	var targetId = event.target.getAttribute("data-opens");
	var menuToShow = document.getElementById(targetId);
	menuArray.forEach(menu=>menu.style.display = "none");
	menuToShow.style.display = "block";
}


var titleInput = document.getElementById("title-input");
var authorInput = document.getElementById("author-input");
var addText = document.getElementById("add-text");
var fontButton = document.getElementById("font-button");
var fontList = document.getElementById("font-list");


var backgroundColor = document.getElementById("background");
var detailColor = document.getElementById("set-color-box");
var setColorBox = document.getElementById("set-color-box");
var colorMode = "background";

var paletteSource = document.getElementById("palette");
var coverSource = document.getElementById("color-source-box");
var colorSourceBox = document.getElementById("color-source-box");
var source = "palette";

var stripesOn = document.getElementById("stripes-on");
var stripesOff = document.getElementById("stripes-box");
var stripesBox = document.getElementById("stripes-box"); 
var stripes = "on";

var takePhotoButton = document.getElementById("take-photo");
var coverFileButton = document.getElementById("cover-file");
var currentFilename = document.getElementById("current-filename");

var countInput = document.getElementById("count-input");
var getCount = document.getElementById("get-count");

var exampleText = document.getElementById("example-content");
var exampleTitle = document.getElementById("example-title");
var exampleAuthor = document.getElementById("example-author");

// event listeners to add:
addText.addEventListener("click", textOn, false);
var fontClick = fontList.addEventListener("click", changeFont, false);

setColorBox.addEventListener("click", colorToggle, false);
colorSourceBox.addEventListener("click", sourceToggle, false);
stripesBox.addEventListener("click", stripeToggle, false);

// getCount.addEventListener("click", getDimensions, false);

// takePhotoButton.addEventListener("change", loadCover);
// coverFileButton.addEventListener("change", loadCover);


// local storage:
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

//color toggle
function colorToggle(){
	if(colorMode === "background"){
		backgroundColor.style.backgroundColor = "rgb(131,140,54)";
		detailColor.style.backgroundColor = "rgb(236,247,147)";
		colorMode = "detail";
	}
	else if(colorMode === "detail") {
		backgroundColor.style.backgroundColor = "rgb(236,247,147)";
		detailColor.style.backgroundColor = "rgb(131,140,54)";
		colorMode = "background";
	}
}

//source toggle
function sourceToggle(){
	if(source === "palette"){
		paletteSource.style.backgroundColor = "rgb(131,140,54)";
		coverSource.style.backgroundColor = "rgb(236,247,147)";
		source = "cover";
	}
	else if(source === "cover") {
		paletteSource.style.backgroundColor = "rgb(236,247,147)";
		coverSource.style.backgroundColor = "rgb(131,140,54)";
		source = "palette";
	}
}


//stripe toggle
function stripeToggle(){
	if(stripes === "on"){
		stripesOn.style.backgroundColor = "rgb(131,140,54)";
		stripesOff.style.backgroundColor = "rgb(236,247,147)";
		stripes = "off";
	}
	else if(stripes === "off") {
		stripesOn.style.backgroundColor = "rgb(236,247,147)";
		stripesOff.style.backgroundColor = "rgb(131,140,54)";
		stripes = "on";
	}
}



function changeFont(fontClick){
	exampleText.style.fontFamily = fontClick.target.id;

}

function textOn(){
	exampleTitle.innerHTML = titleInput.value;
	exampleAuthor.innerHTML = authorInput.value;
}