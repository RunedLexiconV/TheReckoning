function attack(name, length, damage) {
	this.name = name;
	this.length = length;
	this.damage = damage;
}

function Stickman (spritesheet, reverseSpritesheet, portrait, player) { 

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
	
	this.special = {animation: new Animation(spritesheet, reverseSpritesheet,
											FRAME_WIDTH, FRAME_HEIGHT,
											.05, 1, 5, 26,
											SCALE, true, SPRITESHEET_WIDTH), 
					spawnFrames: [{frame: 25, created: false}],
					damage: 30,
					spawnOffset: 50,
					bbX: 75,
					bbY: HEIGHT - 170,
					bbWidth: 80,
					bbHeight: 80};
// The animation parameters are as follows:

// (spriteSheet, reverseSpritesheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, int reverseOffset)

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
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/hit 1.mp3")),//AM.getAsset("./sound/melee-attack.mp3")),
        punch2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 5,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/hit 2.mp3")),//AM.getAsset("./sound/melee-attack.mp3")),
        punch3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 6,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/hit 3.mp3")),//AM.getAsset("./sound/melee-attack.mp3")),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 8,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/kick1.mp3")),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 10,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/kick2.mp3")),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 12,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/kick3.mp3")),
        jump: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 14,
                            SCALE, false, SPRITESHEET_WIDTH),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 30,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/stickman/jumpKick.mp3")),
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
                            0.045, 32, 5, 17,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 3, 5, 24,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/getting-hit.mp3")),
        block: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 25,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.1, 5, 5, 33,
                            SCALE, true, SPRITESHEET_WIDTH, AM.getAsset("./sound/oh-yeah.mp3")),
        lose: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.1, 15, 5, 27,
                            SCALE, false, SPRITESHEET_WIDTH),
        airHurt: new Animation(spritesheet, reverseSpritesheet,
                            FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 34,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/getting-hit.mp3"))

    };
}

function Jenkins (spritesheet, reverseSpritesheet, portrait, player) {


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
	this.special = {animation: new Animation(spritesheet, reverseSpritesheet,
											FRAME_WIDTH, FRAME_HEIGHT,
											.05, 1, 5, 33,
											SCALE, true, SPRITESHEET_WIDTH), 
					spawnFrames: [{frame: 15, created: false}, {frame: 17, created: false}, 
								{frame: 19, created: false}, {frame: 21, created: false}],
					damage: 7.5,
					spawnOffset: 85,
					bbX: 75,
					bbY: HEIGHT - 145,
					bbWidth: 80,
					bbHeight: 30};
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
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/hit1.mp3")),
        punch2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 9, 5, 5,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/hit2.mp3")),
        punch3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 6, 5, 7,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/hit3.mp3")),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 9,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/kick_1.mp3")),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 11,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/kick_2.mp3")),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 13, 5, 13,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/kick_3.mp3")),
        jump: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.035, 5, 5, 16,
                            SCALE, false, SPRITESHEET_WIDTH),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 34,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/jumpKick.mp3")),
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
                            0.06, 29, 5, 19,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 3, 5, 25,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/hurt.mp3")),
        block: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 26,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.1, 5, 5, 32,
                            SCALE, true, SPRITESHEET_WIDTH, AM.getAsset("./sound/yeehaw.mp3")),
        lose: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.1, 15, 5, 27,
                            SCALE, false, SPRITESHEET_WIDTH),
        airHurt: new Animation(spritesheet, reverseSpritesheet,
                            FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 5, 5, 31,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/jenkins/hurt.mp3"))

    };
}

function Ephie(spritesheet, reverseSpritesheet, portrait, player) {
	this.ephie_frame_width = 294;

    this.spritesheet = spritesheet;
	this.reverseSpritesheet = reverseSpritesheet;
    this.portrait = portrait;
	this.player = player;
    this.attacks = [
        new attack("punch1", 70 * SCALE, 10),
        new attack("punch2", 78 * SCALE, 10),
        new attack("punch3", 85 * SCALE, 10),
        new attack("kick1", 12 * SCALE, 10),
        new attack("kick2", 5 * SCALE, 10),
        new attack("kick3", 46 * SCALE, 10)
	];
	this.special = {animation: new Animation(spritesheet, reverseSpritesheet,
											this.ephie_frame_width, FRAME_HEIGHT,
											.1, 3, 5, 27,
											SCALE, true, SPRITESHEET_WIDTH), 
					spawnFrames: [{frame: 10, created: false}, 
								{frame: 16, created: false}, 
								{frame: 21, created: false}
								],
					damage: 7.5,
					spawnOffset: 85,
					bbX: 75,
					bbY: HEIGHT - 145,
					bbWidth: 80,
					bbHeight: 30};
// The animation parameters are as follows:

// (spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, int reverseOffset)
 

    this.animations =  {
        idle: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 0,
                            SCALE, true, SPRITESHEET_WIDTH),
        walk: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            FRAME_DURATION, 9, 5, 2,
                            SCALE, true, SPRITESHEET_WIDTH),
        punch1: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 5, 5, 4,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
        punch2: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 9, 5, 5,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
        punch3: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 10, 5, 7,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 7, 5, 9,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 15, 5, 11,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 14, 5, 14,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/ele-hit.mp3")),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 10, 5, 31,
                            SCALE, false, SPRITESHEET_WIDTH),
        inair: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            FRAME_DURATION, 1, 5, 17,
                            SCALE, false, SPRITESHEET_WIDTH),
        special: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.06, 32, 5, 18,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.15, 3, 5, 25,
                            SCALE, false, SPRITESHEET_WIDTH),
        block: new Animation(spritesheet, reverseSpritesheet, 
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 1, 5, 26,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(spritesheet, reverseSpritesheet,
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 5, 5, 33,
                            SCALE, true, SPRITESHEET_WIDTH, AM.getAsset("./sound/elephant.mp3")),
        lose: new Animation(spritesheet, reverseSpritesheet,
							this.ephie_frame_width, FRAME_HEIGHT,
                            0.05, 13, 5, 28,
                            SCALE, false, SPRITESHEET_WIDTH),
        airHurt: new Animation(spritesheet, reverseSpritesheet, 
                            this.ephie_frame_width, FRAME_HEIGHT,
                            0.15, 5, 5, 34,
                            SCALE, false, SPRITESHEET_WIDTH)

    };
}

function Samuru(spritesheet, reverseSpritesheet, portrait, player) {
	this.Samuru_frame_width = 294;
	this.Samuru_frame_height = 294;

    this.spritesheet = spritesheet;
	this.reverseSpritesheet = reverseSpritesheet;
	this.swordSpritesheet = AM.getAsset("./sprites/sheet 5c.png");
	this.reverseSwordSpritesheet = AM.getAsset("./sprites/sheet 5d.png");
    this.portrait = portrait;
	this.player = player;
    this.attacks = [
        new attack("punch1", 158 * SCALE, 6),
        new attack("punch2", 170 * SCALE, 6),
        new attack("punch3", 169 * SCALE, 6),
        new attack("kick1", 40 * SCALE, 10),
        new attack("kick2", 47 * SCALE, 10),
        new attack("kick3", 58 * SCALE, 10)
	];
	this.special = {animation: new Animation(spritesheet, reverseSpritesheet,
											FRAME_WIDTH, FRAME_HEIGHT,
											.1, 5, 5, 20,
											SCALE, true, SPRITESHEET_WIDTH), 
					spawnFrames: [{frame: 10, created: false}],
					damage: 7.5,
					spawnOffset: 85,
					bbX: 75,
					bbY: HEIGHT - 145,
					bbWidth: 80,
					bbHeight: 30};
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
                            FRAME_DURATION, 9, 5, 1,
                            SCALE, true, SPRITESHEET_WIDTH),
        punch1: new Animation(this.swordSpritesheet, this.reverseSwordSpritesheet, 
							this.Samuru_frame_width, this.Samuru_frame_height,
                            0.05, 6, 5, 0,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/hit_1.mp3")),
        punch2: new Animation(this.swordSpritesheet, this.reverseSwordSpritesheet, 
							this.Samuru_frame_width, this.Samuru_frame_height,
                            0.05, 8, 5, 2,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/hit_2.mp3")),
        punch3: new Animation(this.swordSpritesheet, this.reverseSwordSpritesheet, 
							this.Samuru_frame_width, this.Samuru_frame_height,
                            0.05, 11, 5, 4,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/hit_3.mp3")),
        kick1: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 14, 5, 3,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/kick_1.mp3")),
        kick2: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 14, 5, 6,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/kick_2.mp3")),
        kick3: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 24, 5, 9,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/kick_3.mp3")),
		jumpKick: new Animation(spritesheet, reverseSpritesheet,
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 10, 5, 21,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/jumpKick.mp3")),
        inair: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 1, 5, 14,
                            SCALE, false, SPRITESHEET_WIDTH),
        special: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.06, 15, 5, 15,
                            SCALE, false, SPRITESHEET_WIDTH),
        hurt: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 4, 5, 18,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/hurt.mp3")),
        block: new Animation(spritesheet, reverseSpritesheet, 
							FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 1, 5, 19,
                            SCALE, true, SPRITESHEET_WIDTH),
        win: new Animation(this.swordSpritesheet, this.reverseSwordSpritesheet,
							this.Samuru_frame_width, this.Samuru_frame_height,
                            0.05, 10, 5, 13,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/sam-win.mp3")),
        lose: new Animation(this.swordSpritesheet, this.reverseSwordSpritesheet,
							this.Samuru_frame_width, this.Samuru_frame_height,
                            0.05, 30, 5, 7,
                            SCALE, false, SPRITESHEET_WIDTH),
        airHurt: new Animation(spritesheet, reverseSpritesheet, 
                            FRAME_WIDTH, FRAME_HEIGHT,
                            0.15, 4, 5, 23,
                            SCALE, false, SPRITESHEET_WIDTH, AM.getAsset("./sound/samuru/hurt.mp3"))

    };
}

Stickman.prototype.getAnimation = function(name) {
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
		case "airHurt":
            return this.animations.airHurt;
	}
};

Jenkins.prototype.getAnimation = function(name) {
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
        case "airHurt":
            return this.animations.airHurt;
		
	}
};

Ephie.prototype.getAnimation = function(name) {
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
        case "airHurt":
            return this.animations.airHurt;
		
	}
};

Samuru.prototype.getAnimation = function(name) {
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
        case "airHurt":
            return this.animations.airHurt;
		
	}
};

function special(game, animation, spawnFrames, spawnOffset) {
	this.game = game;
	this.animation = animation;
	this.x = 0;
	this.y = 0;
	this.facing = "right";
	this.spawnFrames = spawnFrames;
	this.spawnOffset = spawnOffset;
	this.boundingBox = new Object();
	this.debug = false;
}

special.prototype.update = function() {
	if (this.facing === "right") {
		this.x += 15;
		this.boundingBox.x += 15;
	} else {
		this.x -= 15;
		this.boundingBox.x -= 15;
	}
};

special.prototype.draw = function() {
	//console.log(this.animation.currentFrame());
	if (this.facing === "right") {
		this.animation.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, false);
	} else {
		this.animation.drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y, true);
	}
	
	if (this.debug) {
		this.game.ctx.save();
		this.game.ctx.beginPath();
		this.game.ctx.rect(this.boundingBox.x, this.boundingBox.y,
							this.boundingBox.bbwidth, this.boundingBox.bbheight);
		this.game.ctx.strokeStyle = "white";
		this.game.ctx.lineWidth = 2;
		this.game.ctx.stroke();
	}
	
};

special.prototype.handleInput = function(key, downEvent) {
	//do nothing
};




