function Player (game, spritesheet, x , y, animations, health , controls) { 
	this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = game.ctx;
    this.state = "idle";
    this,jumpElapsedTime = 0;
    this.velocity = {x: 0, y: 0};
    this.animations = animations;
    this.health = health;
    this.control = controls;
}

PlayerCharacter.prototype.inAir = function () {
	return this.y < this.groundY;
};


Player.prototype.isColliding = function (other) {
	return false;
}

Player.prototype.draw = function () {
	this.animations[this.state].drawFrame(this, this.game.clockTick, this.ctx, this.x, this.y);
};

Player.prototype.update = function() {
	this.x += velocity.x;
	this.y += velocity.y;
}