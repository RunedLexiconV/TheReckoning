var FRAME_WIDTH = 215;
var FRAME_HEIGHT = 215;
var FRAME_DURATION = 0.1;
var SPRITESHEET_WIDTH = 1500;
var SCALE = 1;

function attack(name, length, damage) {
	this.name = name;
	this.length = length;
	this.damage = damage;
}

function Character (spritesheet, reverseSpritesheet, portrait, player) { 

    this.spritesheet = spritesheet;
	this.reverseSpritesheet = reverseSpritesheet;
    this.portrait = portrait;
	this.player = player;
    this.attacks = [
        new attack("punch1", 45 * SCALE, 10),
        new attack("punch2", 49 * SCALE, 10),
        new attack("punch3", 47 * SCALE, 10),
        new attack("kick1", 48 * SCALE, 10),
        new attack("kick2", 52 * SCALE, 10),
        new attack("kick3", 50 * SCALE, 10),
        new attack("jumpKick", 50 * SCALE, 10)
    ];

// The animation parameters are as follows:

// (spriteSheet, reverseSpritesheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, bool reverse, int reverseOffset)

    this.animations = {
        idle: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 10, 5, 0,
                            SCALE, true, SPRITESHEET_WIDTH),
        walk: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 2,
                            SCALE, true, SPRITESHEET_WIDTH),
        punch1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 3,
                            SCALE, false, SPRITESHEET_WIDTH),
        punch2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 5,
                            SCALE, false, SPRITESHEET_WIDTH),
        punch3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 6,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 8,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 10,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 12,
                            SCALE, false, SPRITESHEET_WIDTH),
        jump: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 14,
                            SCALE, false, SPRITESHEET_WIDTH),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 30,
                            SCALE, false, SPRITESHEET_WIDTH),
        inair: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 1, 5, 15,
                            SCALE, true, SPRITESHEET_WIDTH),
        landing: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 5, 5, 16,
                            SCALE, false, SPRITESHEET_WIDTH),
        special: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 32, 5, 17,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 3, 5, 24,
                            SCALE, false, SPRITESHEET_WIDTH),
        block: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 25,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 33,
                            SCALE, true, SPRITESHEET_WIDTH),
        lose: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 15, 5, 27,
                            SCALE, false, SPRITESHEET_WIDTH)

    };
}

function Character2 (spritesheet, reverseSpritesheet, portrait, player) {


    this.spritesheet = spritesheet;
	this.reverseSpritesheet = reverseSpritesheet;
    this.portrait = portrait;
	this.player = player;
    this.attacks = [
        new attack("punch1", 40 * SCALE, 10),
        new attack("punch2", 45 * SCALE, 10),
        new attack("punch3", 41 * SCALE, 10),
        new attack("kick1", 40 * SCALE, 10),
        new attack("kick2", 47 * SCALE, 10),
        new attack("kick3", 58 * SCALE, 10),
        new attack("jumpKick", 50 * SCALE, 10)
	];
// The animation parameters are as follows:

// (spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, int reverseOffset)
 

    this.animations =  {
        idle: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 0,
                            SCALE, true, SPRITESHEET_WIDTH),
        walk: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 1,
                            SCALE, true, SPRITESHEET_WIDTH),
        punch1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 3,
                            SCALE, false, SPRITESHEET_WIDTH),
        punch2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 5,
                            SCALE, false, SPRITESHEET_WIDTH),
        punch3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 7,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 9,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 11,
                            SCALE, false, SPRITESHEET_WIDTH),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 13, 5, 13,
                            SCALE, false, SPRITESHEET_WIDTH),
        jump: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 16,
                            SCALE, false, SPRITESHEET_WIDTH),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 34,
                            SCALE, false, SPRITESHEET_WIDTH),
        inair: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 17,
                            SCALE, false, SPRITESHEET_WIDTH),
        landing: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 5, 5, 18,
                            SCALE, false, SPRITESHEET_WIDTH),
        special: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.04, 29, 5, 19,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 3, 5, 25,
                            SCALE, false, SPRITESHEET_WIDTH),
        block: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 26,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 32,
                            SCALE, true, SPRITESHEET_WIDTH),
        lose: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 15, 5, 27,
                            SCALE, false, SPRITESHEET_WIDTH)

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
		case "jumpKick":
			return this.animations.jumpKick;
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
		case "win":
			return this.animations.win;
		case "lose":
			return this.animations.lose;
		
	}
};

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
		case "jumpKick":
			return this.animations.jumpKick;
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
		case "win":
			return this.animations.win;
		case "lose":
			return this.animations.lose;
		
	}
};

