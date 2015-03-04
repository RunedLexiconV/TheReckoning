function aiPlayer (game, character, x, y, health) {
	Player.call(this, game, character, x, y, health, PLAYER2_CONTROLS);
	aiPlayer.prototype = new Player(game, character, x, y, health, PLAYER2_CONTROLS);
	aiPlayer.prototype.constructor = aiPlayer;
	this.attackRadius = 70;
	this.fleeRadius = 100;
}

aiPlayer.prototype.chooseMove = function() {
	var entities = this.game.entities;
	for (var i = 0; i < entities.length; i++) {
		if (entities[i] != this) {
			var otherGuy = entities[i];
			
		}
	}

};

aiPlayer.prototype.update = function() {
	this.chooseMove();
	Player.prototype.update.call(this);
};

aiPlayer.prototype.draw = function() {Player.prototype.draw.call(this);};
aiPlayer.prototype.handleInput = function() {};