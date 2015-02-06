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
    else if(keys.indexOf(this.control.punch) > -1 || this.state === "punch") {
        this.state = "punch";
        if(this.character.animations.punch1.isDone()) {
            this.character.animations.punch1.elapsedTime = 0;
            this.state = "idle";
        }
    }
    else if(keys.indexOf(this.control.kick) > -1 || this.state === "kick") {
        this.state = "kick";
        if(this.character.animations.kick1.isDone()) {
            this.character.animations.kick1.elapsedTime = 0;
            this.state = "idle";
        }
    }
    else {
        this.velocity.x = 0;
        this.state = "idle";
    }
    if (keys.indexOf(this.control.jump) > -1 ||
                this.state === "jump" ||
                this.state === "inair" ||
                this.state === "landing") {
        this.x += this.velocity.x;
        var totalTime = this.character.animations.jump.totalTime +
                            this.character.animations.landing.totalTime +
                            (this.character.animations.inair.totalTime * 4);
        var elapsedTime = this.character.animations.jump.elapsedTime +
                            this.character.animations.landing.elapsedTime +
                            (this.character.animations.inair.elapsedTime * 4);

        var jumpDistance = elapsedTime / totalTime;
        var jumpIteration = this.character.animations.jump.totalTime / totalTime;
        var landIteration = totalTime - (this.character.animations.landing.totalTime / totalTime);
        console.log(elapsedTime);
        console.log(jumpIteration);
        console.log(landIteration);
        console.log(totalTime);
        console.log(jumpDistance);


        if(jumpDistance < jumpIteration) {
            console.log("jump");
            this.state = "jump";
        }
        else if(jumpDistance > landIteration) {
            console.log("land");
            this.state = "landing";
        }
        else {
            console.log("airtime");
            this.state = "inair";
        }

        if (jumpDistance > 0.5) {
            jumpDistance = 1 - jumpDistance;
        }

        var height = 100*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        if (height <= 0) {
            this.state = "idle";
            this.character.animations.jump.elapsedTime = 0;
            this.character.animations.landing.elapsedTime = 0;
            this.y = GROUND - FRAME_HEIGHT;
        } else {
            this.y = (GROUND - FRAME_HEIGHT) - height;
        }
    }

	this.x += this.velocity.x;
	this.y += this.velocity.y;
}