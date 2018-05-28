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

// COLOR MENU VARIABLES
var backgroundColor = document.getElementById("background");
var detailColor = document.getElementById("set-color-box");
var setColorBox = document.getElementById("set-color-box");
var colorMode = "background";

var paletteButton = document.getElementById("palette-button");
var coverButton = document.getElementById("cover-color-button");
var colorSourceBox = document.getElementById("color-source-box");
var palettePicker = document.getElementById("palette-picker");
var imagePicker = document.getElementById("image-picker");

var stripesOn = document.getElementById("stripes-on");
var stripesOff = document.getElementById("stripes-box");
var stripesBox = document.getElementById("stripes-box"); 
var stripes = "on";

// IMAGE MENU VARIABLES
var takePhotoButton = document.getElementById("take-photo");
var coverFileButton = document.getElementById("cover-file");
var currentFilename = document.getElementById("current-filename");
var file;
var image = document.getElementById("image");
var coverImage = "not loaded";

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
var front = document.getElementById("front");
var back = document.getElementById("back");
var topp = document.getElementById("topp");
var bottom = document.getElementById("bottom");
var spine = document.getElementById("spine");
var edge = document.getElementById("edge");

var frontCtx = front.getContext("2d");
var backCtx = back.getContext("2d");
var spineCtx = spine.getContext("2d");

var leftMargin = 0;
var topMargin = 0;

// 3D MODEL VARIABLES
var camera, scene, renderer, bookBox, geometry;
var frontTexture, backTexture, topTexture, bottomTexture, spineTexture, edgeTexture;

// EVENT LISTENERS
openerArray.forEach(opener=>opener.addEventListener("click", showMenu, false));

addText.addEventListener("click", textOn, false);
var fontClick = fontList.addEventListener("click", changeFont, false);

setColorBox.addEventListener("click", colorToggle, false);
coverButton.addEventListener("click", sourceToggle, false);
paletteButton.addEventListener("click", sourceToggle, false);
palettePicker.addEventListener("click", hidePalette, false);
imagePicker.addEventListener("click", hideImagePicker, false);

stripesBox.addEventListener("click", stripeToggle, false);

takePhotoButton.addEventListener("change", loadCover);
coverFileButton.addEventListener("change", loadCover);

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
	exampleBox.style.fontFamily = fontClick.target.id;
}

function textOn(){
	// exampleTitle.innerHTML = titleInput.value;
	// exampleAuthor.innerHTML = authorInput.value;
}

// **COLOR MENU FUNCTIONS**
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

function sourceToggle(event){
	if(event.target.id == "palette-button"){
		paletteButton.style.backgroundColor = "rgb(236,247,147)";
		colorSourceBox.style.backgroundColor = "rgb(131,140,54)";
		showPalette();
	}
	if(event.target.id == "cover-color-button") {
		if(coverImage == "loaded"){
			paletteButton.style.backgroundColor = "rgb(131,140,54)";
			colorSourceBox.style.backgroundColor = "rgb(236,247,147)";
			showImage();
		}		
	}
}

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

function showPalette(){
	palettePicker.style.display = "block";
	palettePicker.style.top = setColorBox.getBoundingClientRect().top + "px";
	palettePicker.style.left = setColorBox.getBoundingClientRect().left + "px";
	drawColorPicker();
	palettePicker.addEventListener("mousemove", pickPaletteColor);
}

function showImage(){
	imagePicker.width = image.width;
	imagePicker.height = image.height;
	imagePicker.style.display = "block";
	imagePicker.style.top = setColorBox.getBoundingClientRect().top + "px";
	imagePicker.style.left = setColorBox.getBoundingClientRect().left + "px";
	var imageCtx = imagePicker.getContext("2d");
	imageCtx.drawImage(image, 0, 0, image.width, image.height);
	imagePicker.addEventListener("mousemove", pickImageColor);
}

function hidePalette(){
	palettePicker.style.display = "none";
}

function hideImagePicker(){
	imagePicker.style.display = "none";
}


function drawColorPicker(){
  var ctx = palettePicker.getContext("2d");           
  var rainbowGradient = ctx.createLinearGradient( 0, 200, 200, 200);
  rainbowGradient.addColorStop(0, '#ff0000');
  rainbowGradient.addColorStop(1/8, '#ff8000');
  rainbowGradient.addColorStop(2/8, '#ffff00');
  rainbowGradient.addColorStop(3/8, '#00ff00');
  rainbowGradient.addColorStop(4/8, ' #0066ff');
  rainbowGradient.addColorStop(5/8, '#6600ff');
  rainbowGradient.addColorStop(6/8, '#ff00ff');
  rainbowGradient.addColorStop(7/8, '#ff0000');
  rainbowGradient.addColorStop(1, '#000000');
  ctx.fillStyle = rainbowGradient;
  ctx.fillRect(0, 0, 200, 200);
  
  var whiteGradient = ctx.createLinearGradient(200, 200, 200, 0);
  whiteGradient.addColorStop(0, 'hsla(0, 0%, 100%, 0)');
  whiteGradient.addColorStop(1, 'hsla(0, 0%, 100%, 0.95)');
  ctx.fillStyle = whiteGradient;
  ctx.fillRect(0, 0, 200, 200);
  
  var blackGradient = ctx.createLinearGradient(200, 200, 200, 0);
  blackGradient.addColorStop(0, 'hsla(0, 0%, 0%, 1)');
  blackGradient.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
  ctx.fillStyle = blackGradient;
  ctx.fillRect(0, 0, 200, 200);
}

function pickPaletteColor(color){
	palettePicker.style.cursor = "crosshair";
	var paletteCtx = palettePicker.getContext("2d");
	var offsetX = palettePicker.getBoundingClientRect().left;
  	var offsetY = palettePicker.getBoundingClientRect().top;
	var colorValue = paletteCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
	var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')';
	// console.log(rgba);
	frontCtx.fillStyle = rgba;
	backCtx.fillStyle = rgba;
	spineCtx.fillStyle = rgba;
	frontCtx.fillRect(0, 0, width, height);
	backCtx.fillRect(0, 0, width, height);
  	spineCtx.fillRect(0, 0, width, height);
  	imageFit();
}

function pickImageColor(color){
	imagePicker.style.cursor = "crosshair";
	var imageCtx = imagePicker.getContext("2d");
	var offsetX = imagePicker.getBoundingClientRect().left;
  	var offsetY = imagePicker.getBoundingClientRect().top;
	var colorValue = imageCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
	var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')';
	frontCtx.fillStyle = rgba;
	backCtx.fillStyle = rgba;
	spineCtx.fillStyle = rgba;
	frontCtx.fillRect(0, 0, width, height);
	backCtx.fillRect(0, 0, width, height);
  	spineCtx.fillRect(0, 0, width, height);
  	imageFit();
}

// **CANVAS DRAWING FUNCTIONS**
function drawCanvases() {
	front.width = width;
	front.height = height;

	frontCtx.fillStyle = "#838c36";
	frontCtx.fillRect(0, 0, width, height);
	coverText();

	// drawing spine canvas
	spine.width = depth;
	spine.height = height;

	spineCtx.fillStyle = "#5b631b";
	spineCtx.fillRect(0, 0, depth, height);

	spineCtx.save();
	spineCtx.translate(depth, 0);
	spineCtx.rotate(Math.PI/2);
	spineCtx.font = "10px Arial";
	spineCtx.fillStyle = "#ffffff";
	spineCtx.fillText("Little House on the Poorie", 10, 30);
	spineCtx.restore();
	spineCtx.fillStyle = "#ffffff";
	spineCtx.fillText("Laura Ingalls", 10, (height/10)*9);

	// drawing back canvas
	back.width = width;
	back.height = height;


	backCtx.fillStyle = "#838c36";
	backCtx.fillRect(0, 0, width, height);

	// drawing top canvas
	topp.width = width;
	topp.height = 3;

	var topCtx = topp.getContext("2d");
	var endGradient = topCtx.createLinearGradient(width, 0, width, 3);
	  endGradient.addColorStop(0, 'rgb(211, 218, 209)');
	  endGradient.addColorStop(1, 'rgb(190, 173, 121)');
	  topCtx.fillStyle = endGradient;
	  topCtx.fillRect(0, 0, width, 3);
	var endPattern = topCtx.createPattern(topp, "repeat");

	  topp.width = width;
	  topp.height = depth;
	  topCtx.fillStyle = endPattern;
	  topCtx.fillRect(0, 0, width, depth);

	 // drawing bottom canvas
	var bottomCtx = bottom.getContext("2d");
	  bottom.width = width;
	  bottom.height = depth;
	  bottomCtx.fillStyle = endPattern;
	  bottomCtx.fillRect(0, 0, width, depth);

	// drawing edge canvas
	edge.width = 3;
	edge.height = height;

	var edgeCtx = edge.getContext("2d");
	var edgeGradient = edgeCtx.createLinearGradient(0, height, 3, height);
	  edgeGradient.addColorStop(0, 'rgb(211, 218, 209)');
	  edgeGradient.addColorStop(1, 'rgb(190, 173, 121)');
	  edgeCtx.fillStyle = edgeGradient;
	  edgeCtx.fillRect(0, 0, 3, height);
	var edgePattern = edgeCtx.createPattern(edge, "repeat");
	  edge.width = depth;
	  edge.height = height;
	  edgeCtx.fillStyle = edgePattern;
	  edgeCtx.fillRect(0, 0, depth, height);
}
drawCanvases();

function coverText(){
	if(coverImage == "not loaded"){
		console.log("no cover image");
		frontCtx.fillStyle = "#838c36";
		frontCtx.fillRect(0, 0, width, height);
		frontCtx.fillStyle = "#ffffff";
		frontCtx.font = "10px Arial";
		frontCtx.fillText("Little House on the Poorie", 10, 30);
	}
}  

// **IMAGE FUNCTIONS**
function loadCover(changeEvent){
	file = changeEvent.target.files[0];
	var reader = new FileReader();
	reader.addEventListener("load", onCoverFileLoaded);
	reader.readAsDataURL(file); 
}

function onCoverFileLoaded(fileLoadEvent){
	image.src = fileLoadEvent.target.result;
	currentFilename.innerHTML = file.name;
	coverImage = "loaded";
}

image.onload = function(){
		image = document.getElementById("image");
		imageFit();
	};

function imageFit(){
	var boxAspect = width/height;
	var imageAspect = image.width/image.height;
   // if the box front is proportionally taller and thinner than the cover image,
   // we need a margin at the top, and the image to be the width of the box front
	if(boxAspect < imageAspect){
		image.width = width;
		image.height = width/imageAspect;
		topMargin = (height - image.height)/2;
		leftMargin = 0;
	}
	else if(boxAspect >= imageAspect){
		image.width = height * imageAspect;
		image.height = height;
		leftMargin = (width - image.width)/2;
		topMargin = 0;	
	}
	frontCtx.drawImage(image, leftMargin, topMargin, image.width, image.height);
	frontTexture.needsUpdate = true;
}

// **3D MODEL FUNCTIONS**
init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera( 35, 1, 1, 600 );
	camera.position.z = 425;
  	camera.position.y = 150;
 	camera.lookAt(new THREE.Vector3());

	scene = new THREE.Scene();

 	edgeTexture = new THREE.Texture(edge);
 	spineTexture = new THREE.Texture(spine);
 	topTexture = new THREE.Texture(topp);
 	bottomTexture = new THREE.Texture(bottom);
 	frontTexture = new THREE.Texture(front);
 	backTexture = new THREE.Texture(back);

// this hack was added in unwitting response to the error "image is not power of two"
 	edgeTexture.minFilter = THREE.LinearFilter;
 	spineTexture.minFilter = THREE.LinearFilter;
 	topTexture.minFilter = THREE.LinearFilter;
 	bottomTexture.minFilter = THREE.LinearFilter;
 	frontTexture.minFilter = THREE.LinearFilter;
 	backTexture.minFilter = THREE.LinearFilter;

 	// FYI depth, width, and height are variables set by me at the top
	geometry = new THREE.BoxBufferGeometry( width, height, depth );

	var materials = [
	  new THREE.MeshBasicMaterial({map: edgeTexture}),
	  new THREE.MeshBasicMaterial({map: spineTexture}),
	  new THREE.MeshBasicMaterial({map: topTexture}),
	  new THREE.MeshBasicMaterial({map: bottomTexture}),
	  new THREE.MeshBasicMaterial({map: frontTexture}),
	  new THREE.MeshBasicMaterial({map: backTexture})
	];

	bookBox = new THREE.Mesh( geometry, materials );
	scene.add( bookBox );

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( upper.offsetHeight, upper.offsetHeight );
	upper.appendChild( renderer.domElement );
	renderer.domElement.style.margin = "0 auto";
}

function animate() {
	requestAnimationFrame( animate );
  	frontTexture.needsUpdate = true;
  	backTexture.needsUpdate = true;
  	topTexture.needsUpdate = true;
  	bottomTexture.needsUpdate = true;
  	spineTexture.needsUpdate = true;
  	edgeTexture.needsUpdate = true;
	// bookBox.rotation.x += 0.01;
	bookBox.rotation.y -= 0.01;
	renderer.render( scene, camera );
}


