var maxChars = 10;
var TEXT = "";

function GameButton(x,y,w,h) {
	
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	
	
}



function gameOverMenuSetup() {
	 largeMenu = new GameButton(windowWidth / 3.5, 100, 700, 700);
	 mainMenu = new GameButton(largeMenu.x + 125, largeMenu.y + 500, 450, 80);
	// b2Menu = new GameButton(200, 200, 100, 100);
	 HSinput = new GameButton(largeMenu.x + 125, largeMenu.y + 300, 450, 70);
	 leaderboardButton = new GameButton(largeMenu.x + 125, largeMenu.y + 400, 450, 80);
	 backButton =  new GameButton(largeMenu.x + 10, largeMenu.y + 10, 105, 60);
	 leaderBoardBackdrop = new GameButton(largeMenu.x + 140, largeMenu.y + 150, 500, 450);

	//clearMenuBackground();

}
function renderLeaderboard() {
	stroke(0);
	strokeWeight(1);
	
	
	
		
	rect(largeMenu.x,largeMenu.y,largeMenu.w,largeMenu.h);
	fill(255);
	rect(leaderBoardBackdrop.x,leaderBoardBackdrop.y,leaderBoardBackdrop.w,leaderBoardBackdrop.h);
	 fill(255,0,0);
	 rect(backButton.x, backButton.y ,backButton.w,backButton.h);
	
	 image(back,backButton.x+5, backButton.y+8,90,50);
	fill(255);
	text("Name",largeMenu.x + largeMenu.w/5 + 110,largeMenu.y+120 );
	text("Score",largeMenu.x + largeMenu.w/5 + 380,largeMenu.y+120 );
	//text("#",leaderBoardBackdrop.x -60 ,largeMenu.y+120 );

	for(var i=0;i<leaderBoardArray.length;i++) {
		fill(0);
	text(leaderBoardArray[i].nickname ,largeMenu.x + largeMenu.w/2.8 - 20,largeMenu.y+210 + i*90);
	line(leaderBoardBackdrop.x +leaderBoardBackdrop.w/1.3,leaderBoardBackdrop.y,leaderBoardBackdrop.x +leaderBoardBackdrop.w/1.3,leaderBoardBackdrop.y +leaderBoardBackdrop.h );
	line(leaderBoardBackdrop.x - 100,leaderBoardBackdrop.y,leaderBoardBackdrop.x -100,leaderBoardBackdrop.y +leaderBoardBackdrop.h );
	if(leaderBoardArray[i].score.toString().length > 2) {
		text(leaderBoardArray[i].score ,leaderBoardBackdrop.x +leaderBoardBackdrop.w/1.22 ,largeMenu.y+210 + i*90);
	} else {
	text(leaderBoardArray[i].score ,leaderBoardBackdrop.x + leaderBoardBackdrop.w/1.18 ,largeMenu.y+210 + i*90);
	}
	fill(255);
	text((i+1),leaderBoardBackdrop.x - 45,largeMenu.y+210 + i*90);
	text("#" ,leaderBoardBackdrop.x - 95,largeMenu.y+210 + i*90);
	line(leaderBoardBackdrop.x - 100,leaderBoardBackdrop.y + i*90,leaderBoardBackdrop.x + leaderBoardBackdrop.w,leaderBoardBackdrop.y + i*90);
	}
	line(leaderBoardBackdrop.x - 100,leaderBoardBackdrop.y + 450,leaderBoardBackdrop.x + leaderBoardBackdrop.w,leaderBoardBackdrop.y + 450);

}
function addLeaderBoardButton() {

	fill(255,0,0);
	rect(leaderboardButton.x,leaderboardButton.y,leaderboardButton.w,leaderboardButton.h);
	fill(255);
	text("Leaderboard",mainMenu.x+mainMenu.w/5,leaderboardButton.y + leaderboardButton.h/1.5);
}
function renderGameOverMenu() {

	stroke(0);
	strokeWeight(1);
	
		
	fill(0);
	rect(largeMenu.x,largeMenu.y,largeMenu.w,largeMenu.h);
	
	
	 rect(mainMenu.x, mainMenu.y ,mainMenu.w,mainMenu.h);
	fill(255);
	
	text("You scored: " + score,largeMenu.x+largeMenu.w/4,largeMenu.y+ largeMenu.h/4);
	fill(255);

	text("Play Again",mainMenu.x+mainMenu.w/4,mainMenu.y +50);
	newHiscore();
addLeaderBoardButton();
	
}
function renderNewGameMenu() {

	stroke(0);
	strokeWeight(1);
	
		

	rect(largeMenu.x,largeMenu.y,largeMenu.w,largeMenu.h);
	
	 fill(255,0,0);
	 rect(mainMenu.x, mainMenu.y -200 ,mainMenu.w,mainMenu.h);
	fill(255);
	
	text("Don't let the bubbles fall!", largeMenu.x+largeMenu.w/6,largeMenu.y+ largeMenu.h/3);
	text("Hit 3 or more of the same color \n   in a row for bonus points", largeMenu.x+largeMenu.w/6 -100,largeMenu.y+ largeMenu.h/1.2);
	fill(255);

	text("Play",mainMenu.x+mainMenu.w/2.5,mainMenu.y -150);
	newHiscore();
	addLeaderBoardButton();
	
}
function renderPauseGameMenu() {

	stroke(0);
	strokeWeight(1);
	
		

	rect(largeMenu.x,largeMenu.y,largeMenu.w,largeMenu.h);
	
	 fill(255,0,0);
	 rect(mainMenu.x, mainMenu.y -200 ,mainMenu.w,mainMenu.h);
	fill(255);
	
	text("PAUSED", largeMenu.x+largeMenu.w/2.7,largeMenu.y+ largeMenu.h/4);
	fill(255);

	text("Continue",mainMenu.x+mainMenu.w/3.1,mainMenu.y -150);
	newHiscore();
	addLeaderBoardButton();
	
}
function newHiscore() {
if(hasGotHiscore) {
	fill(255,0,0);
	text("You got a hiscore!",mainMenu.x,largeMenu.y +115);

	
	text("Enter your name below",mainMenu.x - 20,largeMenu.y +250);
	fill(255);
	rect(HSinput.x,HSinput.y ,HSinput.w,HSinput.h);
	fill(0);
	TEXT = input;
 text(TEXT,HSinput.x + 35,HSinput.y +HSinput.h - 20);
}
}

function backspaceName() {
    if (input.length > 0 ) {
      input = input.substring(0, input.length-1);
    }
  }

  function addToName(inp) {
    if (input.length < maxChars) {
		input  +=inp;
    }
  }

function leaderBoardClick() {
	
	if(hasClickedTool(leaderboardButton.x, leaderboardButton.y,leaderboardButton.w,leaderboardButton.h)) {
		if(hasGotHiscore) {
			sendHighscore();
			}
		if(leaderboard) return;
	leaderboard = true;
	}
	if(hasClickedTool(backButton.x, backButton.y,backButton.w,backButton.h)) {
		if(!leaderboard) return;
		leaderboard = false;
	}
}
function menuMouseClicked() {
	if(gameOver) {
		leaderBoardClick();
	if(!hasClickedTool(mainMenu.x,mainMenu.y,mainMenu.w,mainMenu.h)) return;
	if(leaderboard) return;
		if(hasGotHiscore) {
		sendHighscore();
		}
		if(TEXT.length > 0) {
		hasGotHiscore = false;
	gameOver = false;
	scoreUpdated = false;
	score= 0;
	balls = [];
	input = "";
		}
	} else if(newGame) {
		leaderBoardClick();
		if(!hasClickedTool(mainMenu.x, mainMenu.y -200,mainMenu.w,mainMenu.h)) return;
		if(leaderboard) return;
console.log("START NEW GAME");
		newGame = false;
		score= 0;
		gameOver = false;
	balls = [];
	} else if(pauseGame) {
		leaderBoardClick();
		if(!hasClickedTool(mainMenu.x, mainMenu.y -200,mainMenu.w,mainMenu.h)) return;
		if(leaderboard) return;
		console.log("UNPAUSE")
		pauseGame = false;
	} 
		
	
	

	
}

function destroyMenuObjs() {
	main = null;
}