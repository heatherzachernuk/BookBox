var brightness = document.getElementById("brightness");
var hue = document.getElementById("hue");
var currentColor = "rgb(212, 255, 191)"

hue.addEventListener("click", event=> hueListen(event));
brightness.addEventListener("click", event=> brightListen(event));

function hueListen(){
  hue.addEventListener("mousemove", event=> pickColor(event, hue));
}

function brightListen(){
  brightness.addEventListener("mousemove", event=> pickColor(event));
}

drawBright();
hueBow();

var g = brightness.getContext('2d')

function drawBright(){
  var brightCtx = brightness.getContext("2d");
 
  var brightGradient = brightCtx.createLinearGradient(0, 0, 0, 200);
  brightGradient.addColorStop(0, "rgba(0,0,0,0)");
  brightGradient.addColorStop(1, "black");
  
  var colorGradient = brightCtx.createLinearGradient(0, 0, 200, 0);
  colorGradient.addColorStop(0, "white");
  colorGradient.addColorStop(1, currentColor);
  brightCtx.fillStyle = colorGradient;
  brightCtx.fillRect(0, 0, 200, 200);  
  brightCtx.fillStyle = brightGradient;
  brightCtx.fillRect(0, 0, 200, 200);  
}

function hueBow(){
  var hueCtx = hue.getContext("2d");
  var hueGradient = hueCtx.createLinearGradient(0, 0, 0, 200);
  hueGradient.addColorStop(0/6, '#ff0000');
  hueGradient.addColorStop(1/6, '#ff8000'); 
  hueGradient.addColorStop(2/6, '#ffff00'); 
  hueGradient.addColorStop(3/6, '#00cc00'); 
  hueGradient.addColorStop(4/6, ' #0066ff'); 
  hueGradient.addColorStop(5/6, '#6600ff'); 
  hueGradient.addColorStop(6/6, '#ff00ff'); 
  hueCtx.fillStyle = hueGradient;
  hueCtx.fillRect(0, 0, 50, 200);
}

function pickColor(color, element){
  element.style.cursor = "crosshair";
  var ctx = element.getContext("2d");
  var offsetX = element.getBoundingClientRect().left;
  var offsetY = element.getBoundingClientRect().top;
  var colorValue = ctx.getImageData(color.clientX - offsetX, color.clientY - offsetY, 1, 1).data;
  var rgba = 'rgba(' + colorValue[0] + ', ' + colorValue[1] + ', ' + colorValue[2] + ', ' + (colorValue[3] / 255) + ')'; 
}