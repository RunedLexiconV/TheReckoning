var FRAME_WIDTH = 215;
var FRAME_HEIGHT = 215;
var FRAME_DURATION = 0.1;
var SPRITESHEET_WIDTH = 1500;
var SCALE = 2;


var Character  = function (spritesheet, portrait, player) { 
    this.spritesheet = spritesheet;
    this.portrait = portrait;
    this.player = 1;
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
                            FRAME_DURATION, 5, 5, 5,
                            SCALE, false, reverse, 0),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 8, 5, 6,
                            SCALE, false, reverse, 0),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 8, 5, 8,
                            SCALE, false, reverse, 0),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 10,
                            SCALE, false, reverse, 0),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 9, 5, 12,
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
    };
}

var Character2 = function (spritesheet, portrait, player) { 
    this.spritesheet = spritesheet;
    this.portrait = portrait;
    this.player = 1;
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
                            FRAME_DURATION, 9, 5, 5,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        punch3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 6, 5, 7,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick1: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            0.05, 7, 5, 9,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick2: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 10, 5, 11,
                            SCALE, false, reverse, SPRITESHEET_WIDTH),
        kick3: new Animation(spritesheet, FRAME_WIDTH, FRAME_HEIGHT,
                            FRAME_DURATION, 13, 5, 13,
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
    };

}

