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
    this.entities = [];
    this.background = null;
    this.keysDown = [];
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
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
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        if(that.keysDown.indexOf(key) < 0) {
            that.keysDown.push(key);
        }
    }, false);

    this.ctx.canvas.addEventListener("keyup", function (event) {
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        var index = that.keysDown.indexOf(key);
        if (index > -1) {
            that.keysDown.splice(index, 1);
        }
    }, false);
};

GameEngine.prototype.setBackground = function (background) {
    this.background = background;
};

GameEngine.prototype.addEntity = function (entity) {
    this.entities.push(entity);
};

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);

    if(this.background) this.ctx.drawImage(this.background, 0, 0, WIDTH, HEIGHT);

    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);

        //Portrait and health, move into player ?
        this.ctx.globalAlpha = 0.7;
        this.ctx.fillStyle = i === 0 ? "blue" : "red";
        this.ctx.fillRect(20 + (700* i) - 5, 20 -5, 60, 60);
        this.ctx.drawImage(this.entities[i].character.portrait, 20 + (700* i), 20, 50, 50);
        this.ctx.strokeStyle = "green";
        this.ctx.lineWidth = "10";
        this.ctx.beginPath();
        this.ctx.moveTo(80+(430* i), 40);
        this.ctx.lineTo(80 + (430*i) + 2*Math.ceil(this.entities[i].health),40);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    this.ctx.restore();
};

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];

        entity.update();
    }
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