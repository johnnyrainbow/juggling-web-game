
function addPowerUp(ball) {

	if(powerUp == "scoreBonus20") {
        text("+20",ball.x,ball.y);
        
			score+=20;
			powerUp = null;
	}

}
