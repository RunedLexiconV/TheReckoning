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
    this.energy = 0;
    if(this.character instanceof Ephie) {
        this.boundingBox.bbwidth = 117;
    }
	this.character.special.game = this.game;
    this.boundingBox.x = (this.x + (FRAME_WIDTH * SCALE - this.boundingBox.bbwidth) / 2);
    this.boundingBox.y = HEIGHT - this.y - FRAME_HEIGHT + 50;//+ (FRAME_HEIGHT * SCALE - this.boundingBox.bbheight) / 2);
    this.debug = false;
	this.jump = null;
    this.entities = this.game.screen.entities;
	this.stateList = ["idle", "moveRight", "moveLeft", "inair", "jumpKick", 
					"punch1", "punch2", "punch3", "kick1", "kick2", "kick3", 
					"special", "hurt", "block", "lose", "win"];
}

Player.prototype.isFacingLeft = function () {
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
    case "inair":
        this.character.animations.inair.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
	case "jumpKick":
        this.character.animations.jumpKick.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        break;
    case "punch1":
        var savedX = this.x;
        if(this.character instanceof Samuru && this.isFacingLeft()) {
            this.x -= 77;
        }
        this.character.animations.punch1.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        this.x = savedX;
        break;

    case "punch2":
        var savedX = this.x;
        if(this.character instanceof Samuru && this.isFacingLeft()) {
            this.x -= 77;
        }
        this.character.animations.punch2.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        this.x = savedX;
        break;

    case "punch3":
        var savedX = this.x;
        if(this.character instanceof Samuru && this.isFacingLeft()) {
            this.x -= 77;
        }
        this.character.animations.punch3.drawFrame(this.game.clockTick, this.ctx,
                                                    this.x, this.y, this.isFacingLeft());
        this.x = savedX;
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
    case "special":
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
    case "airHurt":
        this.character.animations.airHurt.drawFrame(this.game.clockTick, this.ctx,
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

        var attacks = this.character.attacks;
        var colors = ["lemmonchiffon", "lavender", "white", "yellow", "azure", "springgreen"];
        for(var i = 0; i < attacks.length; i++) {

            this.game.ctx.rect(this.boundingBox.x - attacks[i].length,
                                this.boundingBox.y,
                                this.boundingBox.bbwidth + attacks[i].length * 2,
                                this.boundingBox.bbheight);
            this.game.ctx.strokeStyle = colors[i];
            this.game.ctx.lineWidth = 1;
            this.game.ctx.stroke();
        }

        this.game.ctx.restore();
    }
};

Player.prototype.update = function() {
	var entities = this.entities;
	if (this.state != "hurt" && this.state != "airHurt") {
		for (var i = 0; i < entities.length; i++) {
			if (entities[i] != this) {
                if (entities[i] instanceof special) {
                    var theSpecial = entities[i];
                    var hit = !(theSpecial.boundingBox.x + theSpecial.boundingBox.bbwidth < this.boundingBox.x ||
								theSpecial.boundingBox.x > this.boundingBox.x + this.boundingBox.bbwidth);
					if (hit && this.y !== GROUND) {
						hit = this.boundingBox.y + this.boundingBox.bbheight > theSpecial.boundingBox.y;
					}
					if (hit) {
                        if (this.state === "block") {
                            this.health -= theSpecial.damage * 0.05;
                            this.energy -= ENERGY_INCREMENT * 0.1;
                            if (this.isFacingLeft())  {
                                this.x += .35;
                            } else {
                                this.x -= .75;
                            }
                        } else {
    						this.health -= theSpecial.damage;
                            this.energy += ENERGY_INCREMENT * 1.2;
    						this.state = "hurt";
                            this.character.animations.block.elapsedTime = 0;
    						this.y = 0;
                            this.velocity.y = 0;
                        }
					}
                } else {
    				var otherGuy = entities[i];
    				var attack = "";
    				for (var j = 0; j < otherGuy.character.attacks.length; j++) {
    					if (otherGuy.character.attacks[j].name === otherGuy.state) { //other guy is attacking
    						attack = otherGuy.character.attacks[j].name;
    						if (otherGuy.animationFrame > .75 * otherGuy.character.getAnimation(attack).frames) {
    							var attackLength = otherGuy.character.attacks[j].length;
    							var hit = false;
    							var verticalHit = false;
                                if (otherGuy.isFacingLeft()) {
    								hit = otherGuy.boundingBox.x - attackLength <= this.boundingBox.x + this.boundingBox.bbwidth;
    							} else {
    								hit = otherGuy.boundingBox.x + otherGuy.boundingBox.bbwidth + attackLength >= this.boundingBox.x;
    							}
                                if(hit) {
                                    if(otherGuy.y !== GROUND) {
                                        verticalHit = otherGuy.boundingBox.y + (otherGuy.boundingBox.bbheight / 2) >= this.boundingBox.y;
                                        hit = verticalHit;
                                    } else if (this.y !== GROUND) {
                                        verticalHit = otherGuy.boundingBox.y < this.boundingBox.y + this.boundingBox.bbheight;
                                        hit = verticalHit;
                                    }
                                }
    							if (hit) {
    								var damage = otherGuy.character.attacks[j].damage;
    								if (this.state === "block"){
    									this.health -= damage * .05;
                                        this.energy += ENERGY_INCREMENT * 0.1;
    									if (this.isFacingLeft())  {
    										this.x += .35;
										} else {
											this.x -= .75;
										}
									} else {
                                        this.energy += ENERGY_INCREMENT * 1.2;
                                        this.prevState = this.state;
                                        this.character.getAnimation(this.state).elapsedTime = 0;
                                        this.state = verticalHit && this.y > GROUND? "airHurt": "hurt";
										if(this.state === "airHurt") {
											this.jump.start = this.game.timer.gameTime - .5;
										}
                                        this.health -= damage;
                                    }
                                    otherGuy.energy += ENERGY_INCREMENT;
								}
								if(this.health <= 0) {
									this.game.screen.gameOver = true;
                                    this.game.screen.winner = otherGuy.character.player;
									this.state = "lose";
									otherGuy.state = "win";
									if (this.energy > 100) {
										this.energy = 100;
									} 
									if (otherGuy.energy > 100) {
										otherGuy.energy = 100;
									}
								}
								break;
							}
						}
					}
				}
				
				this.facing = this.x > otherGuy.x ? "left" : "right";
				
			}
		}
		
	}
	if(this.health <= 0) {
		this.health = 0;
		this.y = 0;
		this.game.screen.gameOver = true;
		this.game.screen.winner = otherGuy.character.player;
		this.state = "lose";
		otherGuy.state = "win";
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

    case "airHurt":
		if (this.isFacingLeft()) {
			this.x += 2;
		} else {
			this.x -= 2;
		}
	case "jumpKick":
        //x, y behavior is same as inair
    case "inair":
        var timeInAir = this.game.timer.gameTime - this.jump.start;
        this.velocity.y = this.jump.jumpSpeed;
        this.jump.jumpSpeed = 16 - ((timeInAir) * 32);

		if(this.y <= GROUND) {
			if (this.velocity.x < 0) {
				this.state = "moveLeft";
			} else if (this.velocity > 0) {
				this.state = "moveRight";
			} else {
				this.state = "idle";
			}
			this.character.animations.jumpKick.elapsedTime = 0;
            this.jump = null;
		}
        break;

    case "landing":
        if(this.character.animations3.landing.isDone()) {
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
			for (var i = 0; i < this.character.special.spawnFrames.length; i++) {
				this.character.special.spawnFrames[i].created = false;
			}
		}
		
		for (var i = 0; i < this.character.special.spawnFrames.length; i++) {
			if (this.animationFrame === this.character.special.spawnFrames[i].frame &&
				this.character.special.spawnFrames[i].created === false) {
				var newSpecial = new special(this.game, this.character.special.animation, 
											this.character.special.spawnFrames,
											this.character.special.spawnOffset);
				if (this.isFacingLeft()) {
					newSpecial.x = this.x - newSpecial.spawnOffset;
				} else {
					newSpecial.x = this.x + this.boundingBox.bbwidth + newSpecial.spawnOffset;
				}
				newSpecial.boundingBox.x = newSpecial.x + this.character.special.bbX;
				
				newSpecial.y = this.y + 25;
				newSpecial.boundingBox.y = this.character.special.bbY;
				newSpecial.boundingBox.bbwidth = this.character.special.bbWidth;
				newSpecial.boundingBox.bbheight = this.character.special.bbHeight;
				newSpecial.facing = this.facing;
				newSpecial.damage = this.character.special.damage;
				this.game.screen.addEntity(newSpecial);
				this.character.special.spawnFrames[i].created = true;
			}
		}
		
		this.velocity.x = 0;
		this.y = GROUND;
		break;
	case "hurt":
        if(this.character.animations.hurt.isDone()) {
			this.character.animations.hurt.elapsedTime = 0;
			this.interuptable = true;
            this.state = "idle";
		} else if (this.isFacingLeft()) {
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

    if(this.y < GROUND) {
        this.y = GROUND;
        this.velocity.y = 0;
    }

    if(this.boundingBox.x < 0)
        this.x = 0 - (FRAME_WIDTH * SCALE - this.boundingBox.bbwidth) / 2;
    else if(this.boundingBox.x + this.boundingBox.bbwidth > WIDTH)
        this.x = WIDTH - (FRAME_WIDTH * SCALE + this.boundingBox.bbwidth) / 2;
    
    this.energy += ENERGY_INCREMENT * 0.005;
    if(this.energy >= MAX_ENERGY)
        this.energy = MAX_ENERGY;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.boundingBox.x = (this.x + (FRAME_WIDTH * SCALE/2 - this.boundingBox.bbwidth/2));
    if(this.character instanceof Ephie) {
        this.boundingBox.x += this.boundingBox.bbwidth / 2 - 20;
    }
    this.boundingBox.y = HEIGHT - this.y - FRAME_HEIGHT + 50;//(this.y + (FRAME_HEIGHT * SCALE/2 - this.boundingBox.bbheight/2));
	this.clearPrevStates();
};

Player.prototype.clearPrevStates = function() {
	for (var i = 0; i < this.stateList.length; i++) {
		if (this.state !== this.stateList[i]) {
			var state = this.stateList[i];
			var animation = this.character.getAnimation(state);
			//animation.elapsedTime = 0;
			animation.soundPlayed = false;
		}
	}
}

Player.prototype.handleInput = function(key, downEvent) {
    if (!this.game.gameOver) {
        if(this.interuptable) {
            switch(key) {
            case this.control.moveRight:
                if(downEvent) {
					if (this.state === "inair" || this.state === "jumpKick") {
						this.velocity.x = 4;
					} else {
						this.prevState = this.state;
						this.state = "moveRight";
					}
                    
                } else if(this.state !== "moveLeft" && this.state !== "jump") {
                    this.velocity.x = 0;
                    this.moveVelocity = 0;
					if (!(this.state === "inair" || this.state === "jumpKick")) {
						this.prevState = "moveRight";
						this.state = "idle";
					}
                }
                break;

            case this.control.moveLeft:
                if(downEvent) {
					if (this.state === "inair" || this.state === "jumpKick") {
						this.velocity.x = -4;
					} else {
						this.prevState = this.state;
						this.state = "moveLeft";
					}
                    
                } else if(this.state !== "moveRight" && this.state !== "jump") {
                    this.velocity.x = 0;
                    this.moveVelocity = 0;
					if (!(this.state === "inair" || this.state === "jumpKick")) {
						this.prevState = "moveLeft";
						this.state = "idle";
					}
                }
                break;

            case this.control.punch:
                if(!this.jump) {
                    if(this.prevAttack === "punch1") {
                        this.state = "punch2";
                    } else if (this.prevAttack === "punch2") {
                        this.state = "punch3";
                    } else {
                        this.prevState = this.state;
                        this.state = "punch1";
                    }
                    this.interuptable = false;
                }
                break;

            case this.control.kick:
				if (downEvent) {
					if (this.state === "inair" || this.state === "jumpKick") {
						this.state = "jumpKick";
						this.jump.attack = "kick";
					} else if(this.prevAttack === "kick1") {
						this.state = "kick2";
					} else if (this.prevAttack === "kick2") {
						this.state = "kick3";
					} else {
						this.prevState = this.state;
						this.state = "kick1";
					}
					if (this.state !== "jumpKick") {
						this.interuptable = false;
					}
				}
                break;

            case this.control.jump:
				if (downEvent) {
                    if (this.state !== "inair" && this.state !== "jumpKick") {
						this.state = "inair";
						this.jump = {start: this.game.timer.gameTime, height: 0, attack: "none", jumpSpeed: 16};
                        this.y++;
					}
				}
                break;
    		case this.control.special:
    			if (downEvent && this.y === GROUND && this.energy >= ENERGY_ATTACK) {
                    this.energy -= ENERGY_ATTACK;
					this.prevState = this.state;
					this.state = "special";
    				this.interuptable = false;
                }
    			break;
    		case this.control.block:
    			if (downEvent) {
                    if(!this.jump) {
                        this.interuptable = false;
        				this.prevState = this.state;
        				this.state = "block";
        				this.velocity.x = 0;
                    }
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

