var STATE = "GAME";
var count = 0;
var CANVAS_DATA = [];
var newLine;
var balls = [];
var ballPauseVeloz = [];
var score = 0;
var bestScores = [];
var eastWall = 75;
var leaderBoardArray = [];
var leaderNames = [];
var drawing = true;
var maxLineLength = 500;
var maxLineHeight = 400;
var SCORE_TABLE = [2, 5, 10, 17, 25, 40, 70, 110, 150, 200];
var alphabet = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var gameOver = false;
var hasGotHiscore = false;
var newGame = true;
var pauseGame = false;
var input = "";
var leaderboard = false;
var scoreUpdated = false;
var lineTotalLength = 0;
var lineTotalHeight = 0;
var totalDistance = 0;
var endPointX, endPointY;
var endlineX = 0;
var endlineY = 0;
var startX, startY;
var particleX, particleY, particleCol, particleOpacity;
var particles = [];
var lastX,lastY;
var cir1,cir2,cir3;
function generateCircleImage(c1,c2,c3,type){ 
	pg= createGraphics(d*2+15, d*2+15, P2D);
	pg.noFill();
	pg.strokeWeight(7);
	pg.stroke(255);

	pg.ellipse(d,d,d+15,d+15);
	pg.strokeWeight(3);
	pg.filter( BLUR, 9);
	pg.stroke(c1,c2,c3);
	pg.ellipse(d,d,d,d);
if(type == 1) {
	cir1 = pg.get();
} else if(type == 2) {
	cir2 = pg.get();
} else {
	cir3 = pg.get();
}
}
function setup() {

	generateCircleImage(252, 92, 0,1);
	generateCircleImage(0,255,0,2);
	generateCircleImage(5, 109, 188,3);

	createCanvas(windowWidth, windowHeight);
	textFont("Indie Flower")
	if (STATE == "LOBBY") {
		lobbyMenuSetup();
	} else { //STATE IS GAME
		gameSetup();

		balls[0] = new Ball();

	}


}
function fillScoreTable() {

	scoreTable.push({

	});
}
function keyPressed() {
	console.log(keyCode);


	if (hasGotHiscore && gameOver) {
		var addChar = str(key);

		if (keyCode == 8) {
			console.log("BACKSPACE!!!");
			backspaceName();
		} else if (keyCode == 13) {
			//send TEXT to hiscore database.
			//updateBestScore();
			sendHighscore();
		} else {
			if (isInArray(alphabet, addChar.toLowerCase())) {
				addToName(addChar.toLowerCase());
			}
		}
	}
	if (mouseIsPressed) return;
	if (!gameOver && !pauseGame) {
		if (keyCode == 81) { //Q 
			colour = "black";
		} else if (keyCode == 87) {//W 
			colour = "red";
		} else if (keyCode == 69) {//E 
			colour = "green";
		}
	} if (keyCode == 27) { //escape **PAUSE**
		if (gameOver) return;
		if (pauseGame) {
			pauseGame = false;
		} else {

			pauseGame = true;

		}

	}

}
function isInArray(array, search) {
	return array.indexOf(search) >= 0;
}

function cursorImg() {
	if (colour == "black") {
		image(cursor, mouseX, mouseY - 80, 80, 80);
	} else if (colour == "red") {
		image(cursorRed, mouseX, mouseY - 80, 80, 80);
	} else if (colour == "green") {

		image(cursorGreen, mouseX, mouseY - 80, 80, 80);
	}
}

function sendHighscore() {
	if (TEXT.length < 1) return;
	var highscoreData = {
		nick: TEXT,
		playerScore: score

	}
	hasGotHiscore = false;

	addChar = "";
	socket.emit('bestScore', highscoreData);
	scoreUpdated = true;

}
function updateBestScore() {
	if (gameOver) {
		if (leaderBoardArray.length < 1 || score > leaderBoardArray[leaderBoardArray.length - 1].score ) {
			console.log("hiscore!");

			hasGotHiscore = true;
		}
	}

}
function displayScore() {
	textSize(60);
	fill(255);
	stroke(0);
	strokeWeight(5);
	text("Score: " + score, 120, 50);
	if (leaderBoardArray.length > 0) {
		//text("Best: " + leaderBoardArray[0].score + " - " + leaderBoardArray[0].nickname, 100, 50);
	}
}


function drawCanvas(data) {
	if (pauseGame || gameOver) return;
	if (data == null || data.length < 1) return;
	for (var i = 0; i < data.length - 1; i++) {
		//stroke(255);
		brushTool(data[i].col);
		if (data[i].x < eastWall) {
			data[i].x = eastWall;
		} if (data[i].px < eastWall) {
			data[i].px = eastWall;
		}

		drawLine(data[i].x, data[i].y, data[i].px, data[i].py);
		
		
	}
}

function gameSetup() {

	back = loadImage("/client/img/back.png");
	bg = loadImage("/client/img/bg.jpg");
	cursor = loadImage("/client/img/cursor.png");
	cursorRed = loadImage("/client/img/cursorRed.png");
	cursorGreen = loadImage("/client/img/cursorGreen.png");
	item20 = loadImage("/client/img/coin10.png");
	clearGameBackground();
	redrawCanvas(canvData);
	redrawCanvasErase(eraseData);
	if (newGame) {
		gameOverMenuSetup();
	}

}

function clearGameBackground() {

	background(bg);
}


function eraserTool() {

	stroke(255);
	fill(255);
	strokeWeight(30);
}
function brushTool(col) {

	setColour(col);
	strokeWeight(1);

}



function getLineLength(start, end) {

	var lineLength = 0;
	if (start < end) {
		lineLength = end - start;
	} else if (start > end) {
		lineLength = start - end;
	}

	return lineLength;

}
function drawBounds() {
	stroke(0);
	strokeWeight(3);
	line(width, -height, width, height);
	line(0, height, width, height);


}
function mousePressed() {
	totalDistance = 0;
	startX =0;
	startY = 0;
	endPointX = 0;
	endPointY = 0;
	distance = 0;

	CANVAS_DATA = [];

}

function countImplement() {
	if (pauseGame) return;
	if (hasGotHiscore && gameOver) {
		count += 25;
	} else if (newGame) {
		count += 7;
	} else {
		count++;
	}

}

function clipLine() {
	 startX = pmouseX;
	 startY = pmouseY;
	var endX = mouseX;
	var endY = mouseY;
	var lineHeight = getLineLength(startY, endY);
	var lineWidth = getLineLength(startX, endX);

	var distance = Math.sqrt(pow(lineWidth, 2) + pow(lineHeight, 2));
	var originalDistance= distance;
	 
	if (distance + totalDistance > maxLineLength && totalDistance < maxLineLength) {

		var diff = totalDistance+distance - maxLineLength;

		var percent = 1- (diff/originalDistance);

			var newHeight = percent*lineHeight;
			var newWidth = percent*lineWidth;

			console.log("this last line clipped was too big by "+ diff);
		 endPointX = startX +newWidth;
		 endPointY = startY + newHeight;
		
		distance -= diff;
	
		
	} else {
	endPointX = endX;
	endPointY = endY;
	}
	totalDistance += distance;
	console.log(totalDistance);

	//text("Distance: " + totalDistance, 500, 50);
	}

	

	function draw() {

		clearGameBackground();
		drawCanvas(CANVAS_DATA);
		drawBounds();
		displayScore();
		countImplement();
		if (count > 240 + score * 5) {

			balls[balls.length] = new Ball();
			count = 0;

		}

		for (var i = 0; i < balls.length; i++) {

			for (var j = 0; j < CANVAS_DATA.length; j++) {
				checkCollision(balls[i], CANVAS_DATA[j]);
			}
			checkWallCollision(balls[i]);


			drawBall(balls[i]);
		}
		mainToolbar();
		//drawParticles();


		if (mouseIsPressed) {
			
			if (gameOver == false || newGame == false) {
				
				
				
				if(totalDistance >= maxLineLength) return;
				clipLine();
				
				//console.log("DID YOU KNOW THAT " + totalDistance +" IS LESS THAN " + maxLineLength);
				CANVAS_DATA.push({
					col: colour,
					x: startX,
					y: startY,
					px: endPointX,
					py: endPointY

				});
				
				//generateRadiusParticles(startX, startY);
				
			}
		}
		textSize(50);
		if (gameOver) {
			if (leaderboard) {
				renderLeaderboard();
			} else {
				renderGameOverMenu();
			}
		} else if (newGame) {
			if (leaderboard) {
				renderLeaderboard();
			} else {
				renderNewGameMenu();
			}
		} else if (pauseGame) {
			if (leaderboard) {
				renderLeaderboard();
			} else {
				renderPauseGameMenu();
			}
		}
		cursorImg();
	}
	function drawLine(x, y, endX, endY) {
		strokeWeight(4);
		line(x, y, endX, endY);
		
	}
	function drawParticles() {

		for(var i=0;i<particles.length;i++) {
			//fill(particles[i].particleCol);
			point(particles[i].particleX, particles[i].particleY,1,1);
		}
		
		}
	
function Particle(x,y,c,o) {
this.particleX = x;
this.particleY = y;
this.particleCol = c;

}
function generateRadiusParticles(endX, endY) {
	if(lastX == endX && lastY == endY) return;
	var particleRadius = 30;
	var count = 0;

	var px1 = endX +Math.floor((Math.random() * particleRadius) - particleRadius);
	var py1 = endY + Math.floor((Math.random() * particleRadius)  -particleRadius);
	var colfill = Math.floor((Math.random() * 255) + 0);
	 particles[particles.length] = new Particle(px1,py1,colfill,1);
	 console.log("there are now " + particles.length + " particles");
	 lastX = endX;
	 lastY = endY;






}

