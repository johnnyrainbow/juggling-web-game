var d = 72;
var maxVelocity = 3.6;
var ballcols = ["red", "green", "black"];
var items = ["scoreBonus20"];
var powerUp;
var startingPosition = -50;
var colourStack = 0;
var lastStack = 0;
var lastBallCol;
var counter = 0;
var stackPosX, stackPosY = 0;
var stackCol;

function Ball() {
	//generate colour in this constructor
	this.item = null;
	/*if (balls.length % 100 == 0) {
		console.log("ok?");
		var itemGen = Math.floor(Math.random() * items.length);
		this.item = items[itemGen];
	
	}*/

	this.col = ballcols[generateColour()];
	this.x = Math.floor(Math.random() * width/2) +200-d;
	this.y = startingPosition-d;
	this.vy = Math.floor(Math.random() * 2);
	this.vx = Math.floor(Math.random() * 7) - 3.5;
	this.d = d;
}

function displayScoreBonus() {
if(lastStack == null || lastStack < 3) return;
if(counter < 200) {
	setColour(stackCol);
	strokeWeight(1);
	text("+" + lastStack,stackPosX,stackPosY);
	counter++;
}else { 
	counter = 0;
	lastStack = null;
}
}
function applyColourStack(ball) {

	if(colourStack > 2) {
		lastStack = colourStack;
		score +=colourStack;
		stackPosX = ball.x;
		stackPosY = ball.y;
		stackCol = ball.col;
		
	}
	
	}
function checkWallCollision(ball) {

	stroke(0);
	hitW = collideLineCircle(width, -height, width, height, ball.x, ball.y, ball.d);
	hitS = collideLineCircle(eastWall, -height, eastWall, height, ball.x, ball.y, ball.d);
	if (hitW || hitS) {
		ball.vx = -ball.vx;
	}
}
function checkCollision(ball, line) {
if(gameOver || newGame) return;
	hit = collideLineCircle(line.x, line.y, line.px, line.py, ball.x, ball.y, ball.d);

	if (hit && (line.px - line.x < -7 || line.px - line.x > 7)) {

		if (line.col == ball.col || ball.item != null) {
			if (ball.vy > 0) {
				
				score++;
				if(lastBallCol == null || lastBallCol == ball.col) {
					colourStack++;
					applyColourStack(ball);
				} else {
					colourStack = 1;
				}
				lastBallCol = ball.col;
				console.log("STACK " + colourStack);
				ball.vy = 18;
				powerUp = ball.item;
				ball.item = null;
				//addPowerUp(ball);
			
				ball.col = ballcols[generateColour()];
				ball.vy = -ball.vy;
			}
		}


	}
}



function generateColour() {

	var gen = Math.floor(Math.random() * ballcols.length);
	return gen;
}
function drawItem(ball) {
	if (ball.item == null) {
		strokeWeight(4);
	} else {

	if (ball.item == "scoreBonus20") {
		
		image(item20, ball.x - ball.d/2, ball.y - ball.d/2,ball.d*1.1,ball.d*1.1);
		strokeWeight(0);
	
	}
	}

}

function setFill(ballcol) {

	if (ballcol == "red") {
		fill(252, 92, 0);
	} else if (ballcol == "green") {
		fill(0, 255, 0);
	} else if (ballcol == "black") {
		fill(5, 109, 188);
	}

}
function setColour(ballcol) {

	if (ballcol == "red") {
		stroke(252, 92, 0);
	} else if (ballcol == "green") {
		stroke(0, 255, 0);
	} else if (ballcol == "black") {
		stroke(5, 109, 188);
	}

}
function drawBall(ball) {
	
	setColour(ball.col);
	if(pauseGame) return;
	ball.y += ball.vy;
	ball.x += ball.vx;
	noFill();
	drawItem(ball);
if(ball.col == "red") {
image(cir1,ball.x-d, ball.y-d);
} else if(ball.col == "green") {
	image(cir2,ball.x-d, ball.y-d);
} else {
	image(cir3,ball.x-d, ball.y-d);
}
	
	gravity(ball);

	outOfBounds(ball);
	
	displayScoreBonus(ball);
	
	
	
	
}

function outOfBounds(ball) {
	if(newGame) return;
	if (ball.y > height) {
		CANVAS_DATA = [];
		//SCORE_TABLE = [2, 5, 10, 17, 25, 40, 70, 110, 150, 200];
		console.log("GAME OVER");
		balls.splice(ball, 1);
	
		gameOver = true;
		
		gameOverMenuSetup();
		if(scoreUpdated == false) {
		updateBestScore();
		lastStack = 0;
		colourStack = 0;
		}
	}
}
function gravity(b) {
	
	if (b.vy < maxVelocity) { //maximum velocity
		b.vy += 0.27;
	}
}