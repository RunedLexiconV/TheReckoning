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
    this.moveVelocity = 4;
    this.boundingBox = {
        bbwidth: 40,
        bbheight: 120,
        x:this.x - this.bbwidth / 2,
        y:this.y - this.bbheight / 2
    };
}

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
    case "punch1":
        this.character.animations.punch1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;

    // case "punch2";
    //     this.character.animations.punch2.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;

    // case "punch3";
    //     this.character.animations.punch3.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;

    case "kick1":
        this.character.animations.kick1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y);
        break;

    // case "kick2";
    //     this.character.animations.kick2.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;

    // case "kick3";
    //     this.character.animations.kick3.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;

    // case "special";
    //     this.character.animations.special.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;

    // case "block";
    //     this.character.animations.block.drawFrame(this.game.clockTick, this.ctx,
    //                                                 this.x, this.y);
    //     break;
    }
};

Player.prototype.update = function() {
    switch(this.state) {
    case "punch1":
        if(this.character.animations.punch1.isDone()) {
            this.character.animations.punch1.elapsedTime = 0;
            this.interuptable = true;
            this.state = "idle";
        }
        break;

    case "kick1":
        if(this.character.animations.kick1.isDone()) {
            this.character.animations.kick1.elapsedTime = 0;
            this.interuptable = true;
            this.state = "idle";
        }
        break;
        
    case "jump":
        if (this.character.animations.jump.isDone()) {
            this.character.animations.jump.elapsedTime = 0;
            this.state = "inair";
            this.velocity.x = this.moveVelocity;
        }
        break;

    case "inair":
        this.velocity.x = 8;
        var totalTime = this.character.animations.inair.totalTime;
        var elapsedTime = this.character.animations.inair.elapsedTime;

        var jumpDistance = elapsedTime / totalTime;
        //console.log("elapsed " + elapsedTime);
        //console.log("total " + totalTime);
        //console.log("jumpDistance " + jumpDistance);

        if (jumpDistance > 0.5) {
            jumpDistance = 1 - jumpDistance;
        }

        var height = 150 * (-4 * (jumpDistance * jumpDistance - jumpDistance));
        //console.log("height " + height);
        if (height < 0) {
            this.state = "landing";
            this.character.animations.inair.elapsedTime = 0;
            this.y = GROUND - FRAME_HEIGHT;
        } else {
            this.y = (GROUND - FRAME_HEIGHT) - height;
        }
        break;

    case "landing":
        if(this.character.animations.landing.isDone()) {
            this.character.animations.landing.elapsedTime = 0;
            this.interuptable = true;
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;
    }

    if(this.boundingBox.x < 0 - FRAME_WIDTH / 2)
        this.x = 0;
    else if(this.x + this.boundingBox.width > WIDTH)
        this.x = WIDTH - this.boundingBox.width;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

};

Player.prototype.handleInput = function(key, downEvent) {
    if(this.interuptable) {
        switch(key) {
        default:
            this.velocity.x = 0;
            this.state = "idle";
            break;
        
        case this.control.moveRight:
            this.moveVelocity = Math.abs(this.moveVelocity);
            this.velocity.x = this.moveVelocity;
            this.state = "moveRight";
            break;

        case this.control.moveLeft:
            this.moveVelocity = -1 * Math.abs(this.moveVelocity);
            this.velocity.x = this.moveVelocity;
            this.state = "moveLeft";
            break;
        
        case this.control.punch:
            this.velocity.x = 0;
            this.interuptable = false;
            this.state = "punch1";
            break;
        
        case this.control.kick:
            this.velocity.x = 0;
            this.interuptable = false;
            this.state = "kick1";
            break;
        
        case this.control.jump:
            this.velocity.x = 0;
            this.interuptable = false;
            this.state = "jump";
            break;
        
        case this.control.block:
            this.velocity.x = 0;
            this.interuptable = false;
            this.state = "block";
            break;

        case this.control.special:
            this.velocity.x = 0;
            this.interuptable = false;
            this.state = "special";
            break;
        }
    }
};