var FRAME_WIDTH = 215;
var FRAME_HEIGHT = 215;
var FRAME_DURATION = 0.1;
var SPRITESHEET_WIDTH = 1500;
var SCALE = 1.5;

function attack(name, length, damage) {
	this.name = name;
	this.length = length;
	this.damage = damage;
}

var Character  = function (spritesheet, portrait, player) { 
    this.spritesheet = spritesheet;
    this.portrait = portrait;
    this.player = 1;
    this.attackLengths = {
		punch1: 80,
		punch2: 80,
		punch3: 80,
		kick1: 80,
		kick2: 80,
		kick3: 80
	};
	this.attackLength = 80;
	this.attacks = [
	new attack("punch1", 80, 10),
	new attack("punch2", 80, 10),
	new attack("punch3", 80, 10),
	new attack("kick1", 80, 10),
	new attack("kick2", 80, 10),
	new attack("kick3", 80, 10),
	
	];
	
	
// The animation parameters are as follows:

// (spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, bool reverse, int reverseOffset)
    var reverse = false
    if (player === 2) reverse = true;

    this.animations = {
        idle: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 10, 5, 0,
                            SCALE, true, reverse, 0),
        walk: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 2,
                            SCALE, true, reverse, 0),
        punch1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 3,
                            SCALE, false, reverse, 0),
        punch2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 5,
                            SCALE, false, reverse, 0),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 6,
                            SCALE, false, reverse, 0),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 8,
                            SCALE, false, reverse, 0),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 10,
                            SCALE, false, reverse, 0),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 12,
                            SCALE, false, reverse, 0),
        jump: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 14,
                            SCALE, false, reverse, 0),
        inair: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 15,
                            SCALE, false, reverse, 0),
        landing: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 5, 5, 16,
                            SCALE, false, reverse, 0),
		special: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 32, 5, 17,
                            SCALE, false, reverse, 0),
		hurt: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 3, 5, 24,
                            SCALE, false, reverse, 0),
		block: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 25,
                            SCALE, true, reverse, 0)
    };
}

var Character2 = function (spritesheet, portrait, player) { 
    this.spritesheet = spritesheet;
    this.portrait = portrait;
    this.player = 1;
    this.attacks = [
	{name: "punch1", length: 80, damage: 10},
	{name: "punch2", length: 80, damage: 10},
	{name: "punch3", length: 80, damage: 10},
	{name: "kick1", length: 80, damage: 10},
	{name: "kick2", length: 80, damage: 10},
	{name: "kick3", length: 80, damage: 10}
	];
	this.attackLength = 75;
// The animation parameters are as follows:

// (spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, bool reverse, int reverseOffset)
    var reverse = false
    if (player === 2) reverse = true;
 

    this.animations =  {
        idle: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 0,
                            SCALE, true, reverse, SPRITESHEET_WIDTH),
        walk: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 1,
                            SCALE, true, reverse, SPRITESHEET_WIDTH),
        punch1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 3,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        punch2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 5,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 7,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 9,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 11,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 13, 5, 13,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        jump: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 16,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        inair: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 17,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        landing: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 5, 5, 18,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
		special: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 29, 5, 19,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
		hurt: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 3, 5, 25,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
		block: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 26,
                            SCALE, true, reverse, SPRITESHEET_WIDTH)
    };
}

Character.prototype.getAnimation = function(name) {
	switch(name) {
		case "idle":
			return this.animations.idle;
		case "moveRight":
			return this.animations.walk;
		case "moveLeft":
			return this.animations.walk;
		case "punch1":
			return this.animations.punch1;
		case "punch2":
			return this.animations.punch2;
		case "punch3":
			return this.animations.punch3;
		case "kick1":
			return this.animations.kick1;
		case "kick2":
			return this.animations.kick2;
		case "kick3":
			return this.animations.kick3;
		case "jump":
			return this.animations.jump;
		case "inair":
			return this.animations.inair;
		case "landing":
			return this.animations.landing;
		case "special":
			return this.animations.special;
		case "hurt":
			return this.animations.hurt;
		case "block":
			return this.animations.block;
		
	}
}

Character2.prototype.getAnimation = function(name) {
	switch(name) {
		case "idle":
			return this.animations.idle;
		case "moveRight":
			return this.animations.walk;
		case "moveLeft":
			return this.animations.walk;
		case "punch1":
			return this.animations.punch1;
		case "punch2":
			return this.animations.punch2;
		case "punch3":
			return this.animations.punch3;
		case "kick1":
			return this.animations.kick1;
		case "kick2":
			return this.animations.kick2;
		case "kick3":
			return this.animations.kick3;
		case "jump":
			return this.animations.jump;
		case "inair":
			return this.animations.inair;
		case "landing":
			return this.animations.landing;
		case "special":
			return this.animations.special;
		case "hurt":
			return this.animations.hurt;
		case "block":
			return this.animations.block;
	}
}

