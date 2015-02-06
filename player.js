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
    switch (this.state) {
    case "idle":
        this.character.animations.idle.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "moveRight":
        this.character.animations.walk.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "moveLeft":
        this.character.animations.walk.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "jump":
        this.character.animations.jump.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "inair":
        this.character.animations.inair.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "landing":
        this.character.animations.landing.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "punch":
        this.character.animations.punch1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    case "kick":
        this.character.animations.kick1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;
    // case "special";
    //     this.character.animations.special.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;
    }
};

Player.prototype.update = function() {
    var keys = [];
    keys = this.game.keysDown;
    if(keys.indexOf(this.control.moveRight) > -1) {
        this.velocity.x = 4;
        this.state = "moveRight";
    }
    else if (keys.indexOf(this.control.moveLeft) > -1) {
        this.velocity.x = -4;
        this.state = "moveLeft";
    }
    else if (keys.indexOf(this.control.jump) > -1 || this.state === "jump") {
        this.x += this.velocity.x;
        this.state = "jump";
        // if ((GROUND - height) <= 0) {
        //     character.state = "idle";
        // }
        var jumpDistance = (this.character.animations.jump.elapsedTime) / //+
                            // this.character.animations.landing.elapsedTime) /
                            (this.character.animations.jump.totalTime) // +
                            // this.character.animations.landing.totalTime);
        if (jumpDistance > 0.5) {
            console.log("reverse");

            jumpDistance = 1 - jumpDistance;
        }

        var height = 150*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        console.log(jumpDistance);
        console.log(height);
        this.y = this.GROUND - height;
    }
    else {
        this.velocity.x = 0;
        this.state = "idle";
    }

	this.x += this.velocity.x;
	this.y += this.velocity.y;
}