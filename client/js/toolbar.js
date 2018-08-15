var toolX = 0;
var toolY = 30;
var toolW = 80;
var toolH = 950;

var subToolW = toolW - 10;
var subToolH =300;
var subToolX = toolX + 5;
var colourH = toolH/5;
var brushY = 0;
var whiteY =  50;
var redY = whiteY +colourH  +20;
var greenY = redY + colourH +20;

var tool = 1;
var colour = "black";
var lastLoop = new Date;
var fps;
var displayfps =0;
var loops = 0;
function mainToolbar() {
	if(gameOver) return;
	strokeWeight(2);
	stroke(255);
	fill(255);
	stroke(1);
	blackTool();
	redTool();
	greenTool();
	drawGameBounds();
	drawHotKeyOverlay();
	gameLoop();
	displayFPS();
	
	
}
function displayFPS() {
	
text("FPS "+ displayfps, 1000,50);

}
function updateFPS() {
displayfps = fps;
	displayfps = Math.round(displayfps);
}
function gameLoop() { 
    var thisLoop = new Date;
     fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
	loops++;
	if(loops %5 ==0) {
		updateFPS();
	}
}
function drawHotKeyOverlay() {
	//fill(0);
	textSize(40);
	text("Pause [esc]",width - 250 , height - 30);
}
function drawGameBounds() {


	stroke(0);
	strokeWeight(3);
	
	line(eastWall, -height, eastWall, height);
}


function blackTool() {
	
	noFill();
	noStroke();
	rect(subToolX, whiteY, subToolW, colourH);

	setColour("black");
	textSize(50);
	text("Q",subToolX + subToolW/5, colourH - colourH/6);
}
function redTool() {
	
	noFill();
	noStroke();
	rect(subToolX, redY, subToolW, colourH);

	setColour("red");
	textSize(50);
		text("W",subToolX + subToolW/6, colourH*2);
	
}
function greenTool() {
	
	noFill();
	noStroke();
	rect(subToolX, greenY, subToolW, colourH);
	
	setColour("green");
	textSize(50);
		text("E",subToolX + subToolW/4, colourH*3.02);
	
}
function hasClickedTool(x,y,w,h) {
	if(mouseX > x && mouseX < x+w) {
		if (mouseY > y && mouseY < y+h) {
			return true;
		}
	}
		return false;
}

function mouseClicked() {
	
	if(gameOver || newGame || pauseGame) {
		menuMouseClicked();
	} else {

	if(hasClickedTool(subToolX, redY, subToolW, colourH)) {
		
		colour = "red";
		tool = 1;
	}else if(hasClickedTool(subToolX, greenY, subToolW, colourH)) {
	
		colour = "green";
		tool = 1;
	}else if(hasClickedTool(subToolX, whiteY, subToolW, colourH)) {
	
		colour = "black";
		tool = 1;
	}
	}
	
	
}