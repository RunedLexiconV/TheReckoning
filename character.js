var FRAME_WIDTH = 215;
var FRAME_HEIGHT = 215;
var FRAME_DURATION = .1;


function Character (spritesheet) { 
	this.spritesheet = spritesheet;
	that = this;
// The animation parameters are as follows:

// spriteSheet, int frameWidth, int frameHeight,
// int frameDuration(sec), int frames, int lineSize, int startline,
// int scale, bool loop, bool reverse, int reverseOffset

    this.animations = {
    	idle: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 10, 5, 0,
    						1.5, true, false, 0),
    	walk: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 5, 5, 2,
    						1.5, true, false, 0),
    	punch1: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 7, 5, 3,
    						1, false, false, 0),
    	punch2: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 5, 5, 5,
    						1, false, false, 0),
    	punch3: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 8, 5, 6,
    						1, false, false, 0),
    	kick1: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 8, 5, 8,
    						1, false, false, 0),
    	kick2: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 6, 5, 10,
    						1, false, false, 0),
    	kick3: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 9, 5, 12,
    						1, false, false, 0),
    	jump: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 5, 5, 14,
    						1, false, false, 0),
    	inair: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 1, 5, 15,
    						1, true, false, 0),
    	landing: new Animation(that.spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
    						FRAME_DURATION, 5, 5, 16,
    						1, false, false, 0),
    };
}

//define all available Characters here