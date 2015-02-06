function Animation (spriteSheet, frameWidth, frameHeight, frameDuration,
                    frames, lineSize, startline, scale, loop,
                    reverse, reverseOffset, callback) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.frameDuration = frameDuration;
    this.frames = frames;
    this.lineSize = lineSize;
    this.startline = startline;
    this.scale = scale;
    this.loop = loop;
    this.reverse = reverse;
    this.reverseOffset = reverseOffset;

    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.callback = callback;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
        if (this.callback) callback();
    }
    else {
        var frame = this.currentFrame();
        var xindex = frame % this.lineSize;
        var yindex = Math.floor(frame / this.lineSize) + this.startline;

        if(this.reverse)
            xindex += this.reverseOffset;

        ctx.drawImage(this.spriteSheet,
                     xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                     this.frameWidth, this.frameHeight,
                     x, y,
                     this.frameWidth * this.scale,
                     this.frameHeight * this.scale);
    }
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}