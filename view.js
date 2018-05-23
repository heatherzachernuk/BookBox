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

var paletteButton = document.getElementById("palette-button");
var coverButton = document.getElementById("cover-color-button");
var colorSourceBox = document.getElementById("color-source-box");
var paletteImage = document.getElementById("gradient");

var stripesOn = document.getElementById("stripes-on");
var stripesOff = document.getElementById("stripes-box");
var stripesBox = document.getElementById("stripes-box"); 
var stripes = "on";

var takePhotoButton = document.getElementById("take-photo");
var coverFileButton = document.getElementById("cover-file");
var currentFilename = document.getElementById("current-filename");
var file;
var image = document.getElementById("image");

var countInput = document.getElementById("count-input");
var getCount = document.getElementById("get-count");

var exampleBox = document.getElementById("example-box");
var exampleTitle = document.getElementById("example-title");
var exampleAuthor = document.getElementById("example-author");

var width = 150;
var height = 200;
var depth = 50;

// event listeners to add:
addText.addEventListener("click", textOn, false);
var fontClick = fontList.addEventListener("click", changeFont, false);

setColorBox.addEventListener("click", colorToggle, false);
coverButton.addEventListener("click", sourceToggle, false);
paletteButton.addEventListener("click", sourceToggle, false);
paletteImage.addEventListener("click", hidePalette, false);

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
function sourceToggle(event){
	if(event.target.id == "palette-button"){
		paletteButton.style.backgroundColor = "rgb(236,247,147)";
		colorSourceBox.style.backgroundColor = "rgb(131,140,54)";
		choosePaletteColor();
	}
	else if(event.target.id == "cover-color-button") {
		paletteButton.style.backgroundColor = "rgb(131,140,54)";
		colorSourceBox.style.backgroundColor = "rgb(236,247,147)";		
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
	exampleBox.style.fontFamily = fontClick.target.id;
}

function textOn(){
	// exampleTitle.innerHTML = titleInput.value;
	// exampleAuthor.innerHTML = authorInput.value;
}

var leftMargin = 0;
var topMargin = 0;
var imageWidth;
var imageHeight;


// cover image function: 

function loadCover(changeEvent){
	file = changeEvent.target.files[0];
	var reader = new FileReader();
	reader.addEventListener("load", onCoverFileLoaded);
	reader.readAsDataURL(file); 
}

function onCoverFileLoaded(fileLoadEvent){
	image.src = fileLoadEvent.target.result;
	currentFilename.innerHTML = file.name;
}

var geometry;

// this is just a random adjustment at this point
function getDimensions(){
	// geometry = new THREE.BoxBufferGeometry( 100, 150, 200 );
}

// drawing the canvases for the design of the bookbox
var front = document.getElementById("front");
var back = document.getElementById("back");
var topp = document.getElementById("topp");
var bottom = document.getElementById("bottom");
var spine = document.getElementById("spine");
var edge = document.getElementById("edge");



// drawing front canvas
front.width = width;
front.height = height;

var frontCtx = front.getContext("2d");
	// frontCtx.fillStyle = "#838c36";
	// frontCtx.fillRect(0, 0, width, height);
	// frontCtx.font = "10px Arial";
	// frontCtx.fillText("Little House on the Poorie", 10, 30);
	frontCtx.fillStyle = "#838c36";
	frontCtx.fillRect(0, 0, width, height);

image.onload = function(){
		image = document.getElementById("image");
		imageWidth = image.width;
		imageHeight = image.height;	
		imageFit();
	};

function imageFit(){
	var boxAspect = width/height;
	var imageAspect = imageWidth/imageHeight;
   // if the box front is proportionally taller and thinner than the cover image,
   // we need a margin at the top, and the image to be the width of the box front
	if(boxAspect < imageAspect){
		imageWidth = width;
		imageHeight = width/imageAspect;
		topMargin = (height - imageHeight)/2;
		leftMargin = 0;
	}
	else if(boxAspect >= imageAspect){
		imageWidth = height * imageAspect;
		imageHeight = height;
		leftMargin = (width - imageWidth)/2;
		topMargin = 0;	
	}
	frontCtx.drawImage(image, leftMargin, topMargin, imageWidth, imageHeight);
}

// drawing spine canvas
spine.width = depth;
spine.height = height;

var spineCtx = spine.getContext("2d");
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

var backCtx = back.getContext("2d");
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

var camera, scene, renderer, bookBox;
var frontTexture, backTexture, topTexture, bottomTexture, spineTexture, edgeTexture;

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
	bookBox.rotation.y += 0.01;
	renderer.render( scene, camera );
}

function choosePaletteColor(){
	paletteImage.style.display = "block";
	console.log(setColorBox.getBoundingClientRect());
	paletteImage.style.top = setColorBox.getBoundingClientRect().top + "px";
	paletteImage.style.left = setColorBox.getBoundingClientRect().left + "px";
	drawColorPicker();
	paletteImage.addEventListener("mousemove", pickColor);
}

function hidePalette(){
	paletteImage.style.display = "none";
}

function drawColorPicker(){
  var ctx = paletteImage.getContext("2d");           
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

function pickColor(color){
	paletteImage.style.cursor = "crosshair";
	var paletteCtx = paletteImage.getContext("2d");
	var offsetX = paletteImage.getBoundingClientRect().left;
  	var offsetY = paletteImage.getBoundingClientRect().top;
	var colorValue = paletteCtx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
	var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')';
	console.log(rgba);
	frontCtx.fillStyle = rgba;
	backCtx.fillStyle = rgba;
	spineCtx.fillStyle = rgba;
	frontCtx.fillRect(0, 0, width, height);
	backCtx.fillRect(0, 0, width, height);
  	spineCtx.fillRect(0, 0, width, height);
}
