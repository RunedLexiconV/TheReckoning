function Player (game, character, x, y, health, controls) { 
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
    this.interuptable = true;
}

Player.prototype.inAir = function () {
    return this.y + FRAME_HEIGHT< this.GROUND;
};

Player.prototype.isColliding = function (other) {
    return false;
};

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
    if(this.interuptable) {
        if(keys.indexOf(this.control.moveRight) > -1) {
            this.velocity.x = 4;
            this.state = "moveRight";
        }
        else if (keys.indexOf(this.control.moveLeft) > -1) {
            this.velocity.x = -4;
            this.state = "moveLeft";
        }
        else {
            this.velocity.x = 0;
            this.state = "idle";
        }
        if(keys.indexOf(this.control.punch) > -1) {
            this.velocity.x = 0;
            this.state = "punch";
            this.interuptable = false;
        }
        if(keys.indexOf(this.control.kick) > -1) {
            this.velocity.x = 0;
            this.state = "kick";
            this.interuptable = false;
        }
        if(keys.indexOf(this.control.jump) > -1) {
            this.state = "jump";
            this.interuptable = false;
        }
    } else {
        if(this.state === "punch" && this.character.animations.punch1.isDone()) {
            this.character.animations.punch1.elapsedTime = 0;
            this.state = "idle";
            this.interuptable = true;
        }
        else if(this.state === "kick" && this.character.animations.kick1.isDone()) {
            this.character.animations.kick1.elapsedTime = 0;
            this.state = "idle";
            this.interuptable = true;
        }
        else if (this.state === "jump" && this.character.animations.jump.isDone()) {
            this.character.animations.jump.elapsedTime = 0;
            this.state = "inair";
        }
        else if (this.state === "inair") {
            this.x += this.velocity.x;
            var totalTime = this.character.animations.inair.totalTime;
            var elapsedTime = this.character.animations.inair.elapsedTime;

            var jumpDistance = elapsedTime / totalTime;
            //console.log("elapsed " + elapsedTime);
            //console.log("total " + totalTime);
            //console.log("jumpDistance " + jumpDistance);

            if (jumpDistance > 0.5) {
                jumpDistance = 1 - jumpDistance;
            }

            var height = 100 * (-4 * (jumpDistance * jumpDistance - jumpDistance));
            //console.log("height " + height);
            if (height < 0) {
                this.state = "landing";
                this.character.animations.inair.elapsedTime = 0;
                this.y = GROUND - FRAME_HEIGHT;
            } else {
                this.y = (GROUND - FRAME_HEIGHT) - height;
            }
        }
        else if (this.state === "landing") {
            this.velocity.x = 0;
            if(this.character.animations.landing.isDone()) {
                this.character.animations.landing.elapsedTime = 0;
                this.state = "idle";
                this.interuptable = true;
            }
        }
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
};