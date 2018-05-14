var upper = document.getElementById("upper");

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
var file;

var countInput = document.getElementById("count-input");
var getCount = document.getElementById("get-count");

var exampleBox = document.getElementById("example-box");
var exampleText = document.getElementById("example-content");
var exampleTitle = document.getElementById("example-title");
var exampleAuthor = document.getElementById("example-author");

// event listeners to add:
addText.addEventListener("click", textOn, false);
var fontClick = fontList.addEventListener("click", changeFont, false);

setColorBox.addEventListener("click", colorToggle, false);
colorSourceBox.addEventListener("click", sourceToggle, false);
stripesBox.addEventListener("click", stripeToggle, false);


takePhotoButton.addEventListener("change", loadCover);
coverFileButton.addEventListener("change", loadCover);

getCount.addEventListener("click", getDimensions, false);

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

//color toggle:
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

//source toggle:
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


//stripe toggle:
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
	// exampleTitle.innerHTML = titleInput.value;
	// exampleAuthor.innerHTML = authorInput.value;
}

// cover image function: 

function loadCover(changeEvent){
	file = changeEvent.target.files[0];
	var reader = new FileReader();
	reader.addEventListener("load", onCoverFileLoaded);
	reader.readAsDataURL(file); 
}

function onCoverFileLoaded(fileLoadEvent){
	exampleBox.style.backgroundImage = "url('" + fileLoadEvent.target.result + "')";
	currentFilename.innerHTML = file.name;
}

var geometry;

// this is just a random adjustment at this point
function getDimensions(){
	geometry = new THREE.BoxBufferGeometry( 100, 150, 200 );
}

var front = document.getElementById("text");
var frontHeight = upper.offsetHeight;

var ctx = front.getContext("2d");
  ctx.font = "20px Arial";
  ctx.fillStyle = "#838c36";
  ctx.fillRect(0, 0, 300, 300);
  ctx.fillStyle = "#000000";
  ctx.fillText("Little House on the Prairie",30,30);

var camera, scene, renderer, texture, mesh;

init();
animate();


function init() {
	camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.z = 295;
  	camera.position.y = 110;
 	 camera.lookAt(new THREE.Vector3());

	scene = new THREE.Scene();
 	texture = new THREE.Texture(front);
	geometry = new THREE.BoxBufferGeometry( 50, 150, 200 );

	var material = new THREE.MeshBasicMaterial( {  map: texture } );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( frontHeight, frontHeight );
	exampleBox.appendChild( renderer.domElement );
}

function animate() {
	requestAnimationFrame( animate );
  texture.needsUpdate = true;
	// mesh.rotation.x += 0.001;
	mesh.rotation.y += 0.01;
	renderer.render( scene, camera );
}


