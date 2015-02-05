function Character (game, spritesheet, x , y, animations) { 
	this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = game.ctx;
    this.state = "idle";
    this,jumpElapsedTime = 0;
    this.dX= 0;
    this.animations = animations;
}

Character.prototype.inAir = function () {
	return this.y < this.groundY;
};


Character.prototype.isColliding = function (other){
	return false;
}

Character.prototype.draw = function () {
	this.animations[this.state].drawFrame(this, this.game.clockTick, this.ctx, this.x, this.y);

};


Character.prototype.update = function() {

}