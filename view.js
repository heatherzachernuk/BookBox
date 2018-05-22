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
var image = document.getElementById("image");
console.log("orig dimens:", image.width, image.height);

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
		console.log("fff", imageWidth, imageHeight);	
		imageFit();
	};

function imageFit(){
	var boxAspect = width/height;
	var imageAspect = imageWidth/imageHeight;
	console.log("box and image aspects:", boxAspect, imageAspect);
   // if the box front is proportionally taller and thinner than the cover image,
   // we need a margin at the top, and the image to be the width of the box front
	if(boxAspect < imageAspect){
		console.log("box is skinnier!");
		imageWidth = width;
		imageHeight = width/imageAspect;
		topMargin = (height - imageHeight)/2;
		leftMargin = 0;
	}
	else if(boxAspect <= imageAspect){
		console.log("box is fatter!");
		imageWidth = height * imageAspect;
		imageHeight = height;
		leftMargin = (width - imageWidth)/2;
		topMargin = 0;	
	}
	console.log(imageWidth, imageHeight);
	console.log(width, height);
	frontCtx.drawImage(image, leftMargin, topMargin, imageWidth, imageHeight);
}

// drawing spine canvas
spine.width = depth;
spine.height = height;

var spineCtx = spine.getContext("2d");
  spineCtx.fillStyle = "#5b631b";
  spineCtx.fillRect(0, 0, depth, height);

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
	exampleBox.appendChild( renderer.domElement );

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



