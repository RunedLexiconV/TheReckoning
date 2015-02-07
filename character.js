var FRAME_WIDTH = 215;
var FRAME_HEIGHT = 215;
var FRAME_DURATION = 0.1;
var SPRITESHEET_WIDTH = 1500;


function Character (spritesheet, portrait, player) { 
	this.spritesheet = spritesheet;
    this.portrait = portrait;
	that = this;
// The animation parameters are as follows:

// (spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, bool reverse, int reverseOffset)
    var ANIMATION1 = {
        idle: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 10, 5, 0,
                            1.5, true, false, 0),
        walk: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 2,
                            1.5, true, false, 0),
        punch1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 7, 5, 3,
                            1.5, false, false, 0),
        punch2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 5,
                            1.5, false, false, 0),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 6,
                            1.5, false, false, 0),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 8,
                            1.5, false, false, 0),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 10,
                            1.5, false, false, 0),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 9, 5, 12,
                            1.5, false, false, 0),
        jump: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 14,
                            1.5, false, false, 0),
        inair: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 15,
                            1.5, false, false, 0),
        landing: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 16,
                            1.5, false, false, 0),
    };
    var ANIMATION2 = {
        idle: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 10, 5, 0,
                            1.5, true, true, SPRITESHEET_WIDTH),
        walk: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 2,
                            1.5, true, true, SPRITESHEET_WIDTH),
        punch1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 7, 5, 3,
                            1.5, false, true, SPRITESHEET_WIDTH),
        punch2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 5,
                            1.5, false, true, SPRITESHEET_WIDTH),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 6,
                            1.5, false, true, SPRITESHEET_WIDTH),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 8,
                            1.5, false, true, SPRITESHEET_WIDTH),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 10,
                            1.5, false, true, SPRITESHEET_WIDTH),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 9, 5, 12,
                            1.5, false, true, SPRITESHEET_WIDTH),
        jump: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 14,
                            1.5, false, true, SPRITESHEET_WIDTH),
        inair: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 15,
                            1.5, false, true, SPRITESHEET_WIDTH),
        landing: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 5, 5, 16,
                            1.5, false, true, SPRITESHEET_WIDTH),
    };

    if(player === 1) {
        this.animations = ANIMATION1;
    }
    else if (player === 2){
        this.animations = ANIMATION2;
    }
}

//define all available Characters here
