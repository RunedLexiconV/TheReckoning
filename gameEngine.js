window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine() {
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
    this.screen = null;
    this.mode = null;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
    // this.gameOver = false;
    var that = this;
    this.mode = "localVs";
    this.background = 0;
    //var gs = new GameScreen(this);
    var s = new StartScreen(this);
    this.screen = s;
};

GameEngine.prototype.start = function () {
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
};

GameEngine.prototype.startInput = function () {
    var that = this;
    this.ctx.canvas.addEventListener("keydown", function (event) {
        event.preventDefault();
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        if(!that.screen.gameOver) {
            var entities = that.screen.entities;
            for (var i = 0; i < entities.length; i++) {
                entities[i].handleInput(key, true);
            }
        }
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (event) {
        event.preventDefault();
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        if(!that.screen.gameOver) {
            var entities = that.screen.entities;
            for (var i = 0; i < entities.length; i++) {
            entities[i].handleInput(key, false);
            }
        } else {
            if(key && that.screen.winDone) {
                that.screen = new ModeSelect(that);
            }
        }
    }, false);
};

GameEngine.prototype.draw = function () {
    this.screen.draw();
};

GameEngine.prototype.update = function () {
    this.screen.update();
};

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
};

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
};