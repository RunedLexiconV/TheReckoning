function Player (game, character, x, y, health, controls, orientation) { 
    this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = game.ctx;
    this.state = "idle";
    this.prevState = "idle";
    this.prevAttack = "";
    this.jumpElapsedTime = 0;
    this.velocity = {x: 0, y: 0};
    this.character = character;
    this.health = health;
    this.control = controls;
    this.interuptable = true;
    this.moveVelocity = 4;
	this.facing = orientation;
    this.boundingBox = {
        bbwidth: 40,
        bbheight: 120,
        x: 0,
        y: 0
    };
    this.boundingBox.x = (this.x + (FRAME_WIDTH * SCALE - this.boundingBox.bbwidth) / 2);
    this.boundingBox.y = HEIGHT - this.y - FRAME_HEIGHT + 50;//+ (FRAME_HEIGHT * SCALE - this.boundingBox.bbheight) / 2);
    this.debug = true;
	
	this.jump = null;
}

Player.prototype.isFacingLeft = function (other) {
    return this.facing === "left" ? true : false;
};

Player.prototype.draw = function () {
    switch (this.state) {
    case "idle":
        this.character.animations.idle.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "moveRight":
        this.character.animations.walk.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "moveLeft":
        this.character.animations.walk.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "jump":
        this.character.animations.jump.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "inair":
        this.character.animations.inair.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "landing":
        this.character.animations.landing.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "punch1":
        this.character.animations.punch1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    case "punch2":
        this.character.animations.punch2.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    case "punch3":
        this.character.animations.punch3.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    case "kick1":
        this.character.animations.kick1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    case "kick2":
        this.character.animations.kick2.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    case "kick3":
        this.character.animations.kick3.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "Special":
        this.character.animations.special.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "hurt":
        this.character.animations.hurt.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "block":
        this.character.animations.block.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;   

    case "lose":
        this.character.animations.lose.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;   

    case "win":
        this.character.animations.win.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;

    }
	this.animationFrame = this.character.getAnimation(this.state).currentFrame();
    if(this.debug) {
        this.game.ctx.save();
        this.game.ctx.beginPath();
        this.game.ctx.rect(this.boundingBox.x, this.boundingBox.y,
                            this.boundingBox.bbwidth, this.boundingBox.bbheight);
        this.game.ctx.strokeStyle = "white";
        this.game.ctx.lineWidth = 2;
        this.game.ctx.stroke();

        this.game.ctx.rect(this.boundingBox.x - this.character.attackLength,
                            this.boundingBox.y,
                            this.boundingBox.bbwidth + this.character.attackLength * 2,
                            this.boundingBox.bbheight);
        this.game.ctx.strokeStyle = "cyan";
        this.game.ctx.lineWidth = 1;
        this.game.ctx.stroke();

        this.game.ctx.restore();

    }

};

Player.prototype.update = function() {
	var entities = this.game.entities;
	if (this.state != "hurt") {
		for (var i = 0; i < entities.length; i++) {
			if (entities[i] != this) {
				var otherGuy = entities[i];
				var attack = "";
				for (var j = 0; j < otherGuy.character.attacks.length; j++) {
					if (otherGuy.character.attacks[j].name === otherGuy.state) { //other guy is attacking
						attack = otherGuy.character.attacks[j].name;
						if (otherGuy.animationFrame > .75 * otherGuy.character.getAnimation(attack).frames) {
							var attackLength = otherGuy.character.attacks[j].length;
							var hit;
							if (this.character.animations.idle.reflect) {
								hit = otherGuy.boundingBox.x + otherGuy.boundingBox.bbwidth + attackLength > this.boundingBox.x ? true : false;
							} else {
								hit = otherGuy.boundingBox.x - attackLength < this.boundingBox.x + this.boundingBox.bbwidth ? true : false;
							}
							if (hit) {
								var damage = otherGuy.character.attacks[j].damage;
								if (this.state === "block"){
									this.health -= damage * .05;
									if (this.character.animations.idle.reflect)  {
										this.x += .35;
									} else {
										this.x -= .75;
									}
									
								} else {
                                    this.prevState = this.state;
									this.state = "hurt";
									this.health -= damage;
								}
							}
                            if(this.health <= 0) {
                                this.game.gameOver = true;
                                // this.state = "lose";
                                // otherGuy.state = "win";
                            }
							break;
						}
					}
				}
				this.facing = this.x > otherGuy.x ? "left" : "right";
				//if (this.character.player === 1) console.log(this.orientation);
			}
		}
	}

    switch(this.state) {
    case "moveRight":
        this.moveVelocity = 4;
        this.velocity.x = this.moveVelocity;
        break;

    case "moveLeft":
        this.moveVelocity = -4;
        this.velocity.x = this.moveVelocity;
        break;

    case "punch1":
        if(this.character.animations.punch1.isDone()) {
            this.character.animations.punch1.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = this.state;
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "punch2":
        if(this.character.animations.punch2.isDone()) {
            this.character.animations.punch2.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = "punch2";
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "punch3":
        if(this.character.animations.punch3.isDone()) {
            this.character.animations.punch3.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = "punch3";
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "kick1":
        if(this.character.animations.kick1.isDone()) {
            this.character.animations.kick1.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = "kick1";
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "kick2":
        if(this.character.animations.kick2.isDone()) {
            this.character.animations.kick2.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = "kick2";
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "kick3":
        if(this.character.animations.kick3.isDone()) {
            this.character.animations.kick3.elapsedTime = 0;
            this.interuptable = true;
            this.prevAttack = "kick3";
            this.state = "idle";
        }
        this.velocity.x = 0;
        break;

    case "jump":
        //if (this.character.animations.jump.isDone()) {
        //    this.character.animations.jump.elapsedTime = 0;
        //    this.state = "inair";
        //}
        //this.velocity.x = 0;
        //break;

    case "inair":
        //this.velocity.x = this.moveVelocity;
        //var totalTime = this.character.animations.inair.totalTime;
        //var elapsedTime = this.character.animations.inair.elapsedTime;
        //var jumpDistance = elapsedTime / totalTime;

        //if (jumpDistance > 0.5) {
        //    jumpDistance = 1 - jumpDistance;
        //}

        //var height = 150 * (-4 * (jumpDistance * jumpDistance - jumpDistance));
        //if (height < 0) {
        //    this.state = "landing";
        //    this.character.animations.inair.elapsedTime = 0;
        //    this.y = GROUND - FRAME_HEIGHT * SCALE;
        //} else {
        //    this.y = (GROUND - FRAME_HEIGHT * SCALE) - height;
        //}
		var timeInAir = this.game.timer.gameTime - this.jump.start;
		this.velocity.y = this.jump.jumpSpeed;
		this.jump.jumpSpeed = 16 - ((timeInAir) * 32);
		if(this.y < GROUND) {
			if (this.velocity.x < 0) {
				this.state = "moveLeft"
			} else if (this.velocity > 0) {
				this.state = "moveRight";
			} else {
				this.state = "idle";
			}
			this.velocity.y = 0;
			this.y = GROUND;
		}
        break;

    case "landing":
        if(this.character.animations.landing.isDone()) {
            this.character.animations.landing.elapsedTime = 0;
            this.interuptable = true;
            this.state = this.prevState;
        }
        this.velocity.x = 0;
        break;
    
	case "special":
        if(this.character.animations.special.isDone()) {
			this.character.animations.special.elapsedTime = 0;
			this.interuptable = true;
            this.state = this.prevState;
		}
		this.velocity.x = 0;
		break;
	case "hurt":
        if(this.character.animations.hurt.isDone()) {
			this.character.animations.hurt.elapsedTime = 0;
			this.interuptable = true;
            this.state = this.prevState;
		} else if (this.character.animations.idle.reflect) {
			this.x += .5;
		} else {
			this.x -= .5;
		}
		break;
	case "block":
        if(this.character.animations.block.isDone()) {
            this.character.animations.block.elapsedTime = 0;
            this.interuptable = true;
            this.state = this.prevState;
        }
        break;
    }

    if(this.boundingBox.x < 0)
        this.x = 0 - (FRAME_WIDTH * SCALE - this.boundingBox.bbwidth) / 2;
    else if(this.boundingBox.x + this.boundingBox.bbwidth > WIDTH)
        this.x = WIDTH - (FRAME_WIDTH * SCALE + this.boundingBox.bbwidth) / 2;
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.boundingBox.x = (this.x + (FRAME_WIDTH * SCALE/2 - this.boundingBox.bbwidth/2));
    this.boundingBox.y = HEIGHT - this.y - FRAME_HEIGHT + 50;//(this.y + (FRAME_HEIGHT * SCALE/2 - this.boundingBox.bbheight/2));

};

Player.prototype.handleInput = function(key, downEvent) {
    if (!this.game.gameOver) {
        if(this.interuptable) {
            switch(key) {
            case this.control.moveRight:
                if(downEvent) {
					if (this.state === "inair") {
						this.velocity.x = 4;
					} else {
						this.prevState = this.state;
						this.state = "moveRight";
					}
                    
                } else {
                    this.velocity.x = 0;
                    this.moveVelocity = 0;
					if (!(this.state === "inair")) {
						this.prevState = "moveRight";
						this.state = "idle";
					}
                }
                break;

            case this.control.moveLeft:
                if(downEvent) {
					if (this.state === "inair") {
						this.velocity.x = -4;
					} else {
						this.prevState = this.state;
						this.state = "moveLeft";
					}
                    
                } else {
                    this.velocity.x = 0;
                    this.moveVelocity = 0;
					if (!(this.state === "inair")) {
						this.prevState = "moveLeft";
						this.state = "idle";
					}
                }
                break;

            case this.control.punch:
                if(this.prevAttack === "punch1") {
                    this.state = "punch2";
                } else if (this.prevAttack === "punch2") {
                    this.state = "punch3";
                } else {
                    this.prevState = this.state;
                    this.state = "punch1";
                }
                this.interuptable = false;
                break;

            case this.control.kick:
                if(this.prevAttack === "kick1") {
                    this.state = "kick2";
                } else if (this.prevAttack === "kick2") {
                    this.state = "kick3";
                } else {
                    this.prevState = this.state;
                    this.state = "kick1";
                }
                this.interuptable = false;
                break;

            case this.control.jump:
                //if(downEvent) {
                //    this.interuptable = true;
                //    this.prevState = this.state;
                //    this.state = "jump";
                //} else {
                //    this.velocity.x = this.moveVelocity;
                //    this.state = this.prevState;
                //    this.prevState = "jump";
                //}
				if (downEvent) {
					if (this.state !== "inair") {
						this.state = "inair";
						this.jump = {start: this.game.timer.gameTime, height: 0, attack: "none", jumpSpeed: 16};
					}
				}
                break;
    		case this.control.special:
    			/*needs work here*/
    			break;
    		case this.control.block:
    			if (downEvent) {
                    this.interuptable = false;
    				this.prevState = this.state;
    				this.state = "block";
    				this.velocity.x = 0;
    			}
    			break;
            }
        } else {
            if (!downEvent) {
                switch (key) {

                case this.control.block:
                    this.interuptable = true;
                    this.state = this.prevState;
                    this.prevState = "block";
                    break;


                }
            }
        }
    }
};

