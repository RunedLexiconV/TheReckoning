function aiPlayer (game, character, x, y, health) {
	Player.call(game, character, x, y, health, PLAYER2_CONTROLS);
	attackRadius = 70;
	fleeRadius = 100;
}

aiPlayer.prototype.chooseMove = function(first_argument) {
	
};