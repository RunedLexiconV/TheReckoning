var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, frameDuration, frames, rowOffset, loop, reverse) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.reverse = reverse;
    this.rowOffset = rowOffset;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    
    var xindex = frame % 5;
    var yindex = Math.floor(frame / 5) + this.rowOffset;

    var sx = 3 + (xindex * (this.frameWidth + 17));
    var sy = 3 + (yindex * (this.frameHeight+ 17));
    ctx.drawImage(this.spriteSheet, //image
                 sx, sy,  // source location
                 this.frameWidth, this.frameHeight, //source dim
                 x, y, // destination location
                 this.frameWidth, // destination dim
                 this.frameHeight);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

function SwordGuy(game, spritesheet) {
    this.allAnimations = [
        new Animation(AM.getAsset("./img/sheet 2a.png"), 198, 198, .09, 7, 3, false, false),
        new Animation(AM.getAsset("./img/sheet 2a.png"), 198, 198, .09, 5, 5, false, false),
        new Animation(AM.getAsset("./img/sheet 2a.png"), 198, 198, .09, 8, 6, false, false)
    ];
    
    this.currentAnimation = this.allAnimations[0];
    this.x = 0;
    this.y = 0;
    this.game = game;
    this.ctx = game.ctx;
}

SwordGuy.prototype.draw = function () {
    //    console.log("drawing");
    this.currentAnimation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
}

SwordGuy.prototype.update = function () {
    if (this.allAnimations[0].isDone()) {
        this.currentAnimation = this.allAnimations[1];
        this.allAnimations[0].elapsedTime = 0;
    } else if (this.allAnimations[1].isDone()) {
        this.currentAnimation = this.allAnimations[2];
        this.allAnimations[1].elapsedTime = 0;
    } else if (this.allAnimations[2].isDone()) {
        this.currentAnimation = this.allAnimations[0];
        this.allAnimations[2].elapsedTime = 0;
    }
    
}


AM.queueDownload("./img/sheet 2a.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");


    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    gameEngine.addEntity(new SwordGuy(gameEngine, AM.getAsset("./img/sheet 2a.png")));

    console.log("All Done!");
});
















