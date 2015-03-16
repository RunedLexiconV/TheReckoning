function Animation (spriteSheet, reverseSpritesheet, frameWidth, frameHeight, 
					frameDuration, frames, lineSize, startline, scale, loop, reverseOffset, sound) {
    this.spriteSheet = spriteSheet;
	this.reverseSpritesheet = reverseSpritesheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.lineSize = lineSize;
    this.startline = startline;
    this.scale = scale;
    this.loop = loop;
    this.reverseOffset = reverseOffset;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.sound = sound;
	this.soundPlayed = false;
    this.lastSound = 0;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y, reverse) {
	var translatedY = HEIGHT - y - this.frameHeight;
    this.elapsedTime += tick;
    var frame = -1;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
        else frame = this.frames - 1;
    }
    if (frame === -1) {
        var frame = this.currentFrame();
    }
    var xindex = frame % this.lineSize;
    var yindex = Math.floor(frame / this.lineSize) + this.startline;
    if(reverse) {
        xindex += 1;
        ctx.drawImage(this.reverseSpritesheet,
                    this.reverseOffset - (xindex * this.frameWidth),
                    yindex * this.frameHeight,
                    this.frameWidth, this.frameHeight,
                    x, translatedY,
                    this.frameWidth,
                    this.frameHeight);
    }
    else {
        ctx.drawImage(this.spriteSheet,
                    xindex * this.frameWidth, yindex * this.frameHeight,
                    this.frameWidth, this.frameHeight,
                    x, translatedY,
                    this.frameWidth,
                    this.frameHeight);
    }
    if(this.sound) {
        var time = new Date();
        time = time.getTime();
        //if(time - this.lastSound > 2000) {
			if (!this.soundPlayed) {
				this.sound.play();
				this.soundPlayed = true;
			}
            
            //this.lastSound = time;
        //}

    }
};

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
};

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
};