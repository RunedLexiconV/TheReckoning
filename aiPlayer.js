function random(max, min) {
  return Math.random() * (max - min) + min;
}

function aiPlayer (game, character, x, y, health) {
	Player.call(this, game, character, x, y, health, PLAYER2_CONTROLS, "left");
	aiPlayer.prototype = new Player(this.game, this.character, this.x, this.y,
									this.health, this.control, this.facing);
	aiPlayer.prototype.constructor = aiPlayer;
	this.controls = PLAYER2_CONTROLS;
	this.attackLength = 50;
	this.fleeLength = 70;
	this.moveTime = 1;
	this.prevControl = "idle";
}

aiPlayer.prototype.draw = function() {Player.prototype.draw.call(this);};
aiPlayer.prototype.handleInput = function(key, downevent) {Player.prototype.handleInput.call(this, key, downevent);};
aiPlayer.prototype.isFacingLeft = function() {
    return this.facing === "left" ? true : false;
};

aiPlayer.prototype.chooseMove = function() {
	this.handleInput(this.prevControl, false);
	var entities = this.game.screen.entities;
	for (var i = 0; i < entities.length; i++) {
		if (entities[i] !== this && !(entities[i] instanceof special)) {
			var otherGuy = entities[i];
			var hitable;
			var flee;
			if (otherGuy.isFacingLeft()) {
				hitable = otherGuy.boundingBox.x - this.attackLength <= this.boundingBox.x + this.boundingBox.bbwidth ? true : false;
				flee = otherGuy.boundingBox.x - this.fleeLength <= this.boundingBox.x + this.boundingBox.bbwidth ? true : false;
			} else {
				hitable = otherGuy.boundingBox.x + otherGuy.boundingBox.bbwidth + this.attackLength >= this.boundingBox.x ? true : false;
				flee = otherGuy.boundingBox.x + otherGuy.boundingBox.bbwidth + this.flee >= this.boundingBox.x ? true : false;
			}
			if(hitable) {
				if(random(0, 100) < 10) {
					this.handleInput(this.controls.block, true);
					this.prevControl = this.controls.block;
				}
				else if(random(0, 100) < 50) {
					this.handleInput(this.controls.punch, true);
					this.prevControl = this.controls.punch;
				}
				else {
					this.handleInput(this.controls.kick, true);
					this.prevControl = this.controls.kick;
				}
			} else if(flee) {
				if(this.isFacingLeft()) {
					this.handleInput(this.controls.moveRight, true);
					this.prevControl = this.controls.moveRight;
				} else {
					this.handleInput(this.controls.moveLeft, true);
					this.prevControl = this.controls.moveLeft;
				}
			} else {
				if(this.isFacingLeft()) {
					this.handleInput(this.controls.moveLeft, true);
					this.prevControl = this.controls.moveLeft;
				} else {
					this.handleInput(this.controls.moveRight, true);
					this.prevControl = this.controls.moveRight;
				}				
			}
		}
	}
};

aiPlayer.prototype.update = function() {
	if((this.game.timer.gameTime % this.moveTime) > (this.moveTime * 0.9)) {		
		this.chooseMove();
	}
	Player.prototype.update.call(this);
};

