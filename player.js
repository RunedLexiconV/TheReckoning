function Player (game, character, x , y, health , controls) { 
	this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = game.ctx;
    this.state = "idle";
    this.jumpElapsedTime = 0;
    this.velocity = {x: 0, y: 0};
    this.character = character;
    this.health = health;
    this.control = controls;
}

Player.prototype.inAir = function () {
	return this.y < this.groundY;
};


Player.prototype.isColliding = function (other) {
	return false;
}

Player.prototype.draw = function () {
    if(this.state == "idle")
        this.character.animations.idle.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
    
};

Player.prototype.update = function() {
	this.x += this.velocity.x;
	this.y += this.velocity.y;
}