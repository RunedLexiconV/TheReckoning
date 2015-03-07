var startGame = function (e) {
  gameEngine.start();
  gameEngine.startInput();
  document.getElementById("canvas").focus();
  timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", 36);
  var character1 = new Character(AM.getAsset("./sprites/sheet 2a.png"),
                                    AM.getAsset("./sprites/portrait1.png"), 1);
  var character2 = new Character2(AM.getAsset("./sprites/sheet 3b.png"),
                                    AM.getAsset("./sprites/portrait2.png"), 2);
  gameEngine.addEntity(new Player(gameEngine, character1,
                                  50 , GROUND - FRAME_HEIGHT,
                                  HEALTH, PLAYER1_CONTROLS));
 
  gameEngine.addEntity(new Player(gameEngine, character2,
                                  WIDTH - FRAME_WIDTH - 50 , GROUND - FRAME_HEIGHT,
                                  HEALTH, PLAYER2_CONTROLS));
  window.removeEventListener("keydown", startListener, false);
  window.addEventListener("keyup", function (e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    if(key === 'q') {
      if(timer) {
        window.clearInterval(timer);
      }
      background = (background + 1) % 2;
      var frames = background === 0 ? 36 : 8;
      switch (background) {
        case 0: frames = 36; break;
        case 1: frames = 9; break;
        case 2: frames = 56; break;
        case 3: frames = 40; break;
        default: break;
      }
      timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", frames);
    }
  });
};

//------------------------------------- BEGIN START SCREEN ----------------------------------------------

function StartScreen (gameEngine) {
  this.gameEngine = gameEngine;
  this.ctx = gameEngine.ctx;
  this.entities = [this];
  this.shadowBlur = 2;
  this.shadowUp = true;
  this.goToModeSelect = false;
}

StartScreen.prototype.update = function() {
  if(this.goToModeSelect) {
    this.gameEngine.screen = new CharSelectScreen(this.gameEngine);
  }
  if(this.shadowBlur <= 2) this.shadowUp = true;
  if(this.shadowBlur >= 30) this.shadowUp = false;
  this.shadowUp ?  this.shadowBlur += 2: this.shadowBlur -= 2;
};

StartScreen.prototype.draw = function() {
  this.ctx.save();
  this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
  this.ctx.drawImage(AM.getAsset("./sprites/runedlogo.png"), 100, 100, 600, 200);
  this.ctx.font = "20px runed";
  this.ctx.shadowColor = "white";
  this.ctx.shadowBlur = Math.ceil(this.shadowBlur);
  this.ctx.fillStyle = "black";
  this.ctx.strokeStyle = "white";
  this.ctx.textAlign = "center";
  this.ctx.fillText("Press any key to continue...", WIDTH / 2, 400);
  this.ctx.strokeText("Press any key to continue...", WIDTH / 2, 400);
  this.ctx.restore();
};

StartScreen.prototype.handleInput = function(key, downEvent) {
  if(key && !downEvent) {
    this.goToModeSelect = true;
  }
};



//--------------------------- END START SCREEN ---------------------------------------------------
//--------------------------- BEGIN SELECT SCREEN ---------------------------------------------------

function CharSelectScreen (gameEngine) {
  this.titleHeight = 50;
  this.portraitWidth = 75;
  this.padding = 20;
  this.ctx = gameEngine.ctx;
  this.entities = [this];
  this.gameEngine = gameEngine;
  this.player1Ready = false;
  this.player2Ready = false;

  //var stickman = new Character(AM.getAsset("./sprites/sheet 2a.png"), AM.getAsset("./sprites/portrait1.png"), 1);
  //var jenkins = new Character2(AM.getAsset("./sprites/sheet 3b.png"), AM.getAsset("./sprites/portrait2.png"), 1);
  var portrait1 = AM.getAsset("./sprites/portrait1.png");
  var portrait2 = AM.getAsset("./sprites/portrait2.png");

  this.selections = [];
  this.selections.push({name: "Stickman", portrait: portrait1, x: 0, y:0});
  this.selections.push({name: "Jenkins", portrait: portrait2, x: 0, y: 0});

	this.selector1 = {x: 0, y: 0, color: "blue", charIndex: 0, selected: false};
  if (gameEngine.mode === "localMult") this.selector2 = {x: 0, y: 0, color: "red", charIndex: 0, selected: false};  
  var initX = Math.ceil((WIDTH - (this.portraitWidth + this.padding * 2) * this.selections.length) / 2);
  if(initX < this.padding) console.log("ERROR: SelectScreen portrait section starting x too small");
  //draw character portraits
	for (var i = 0; i < this.selections.length; i++) {
    this.selections[i].x = initX + (this.portraitWidth + this.padding)* i;
    this.selections[i].y = this.titleHeight + 400;
	}
}

CharSelectScreen.prototype.update = function () {
    if(this.player1Ready && this.player2Ready)  {
      var p1 = this.selections[this.selector1.charIndex];
      var p2 = this.selections[this.selector2.charIndex];
      var gs = new GameScreen(this.gameEngine);
      this.gameEngine.screen = gs;
      gs.addPlayers(p1.name, p2.name);
    }
};

CharSelectScreen.prototype.draw = function () {
    this.ctx.save();
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        //draw selectors
    if(this.selections.length > 0) {
      this.ctx.fillStyle = this.selector1.color;
      this.ctx.fillRect(this.selections[this.selector1.charIndex].x - 5, this.selections[this.selector1.charIndex].y - 5, 
                  (this.portraitWidth / 2) + 5, this.portraitWidth + 10);
      
      this.ctx.font = "24px runed";
      this.ctx.strokeStyle = this.selector1.color;
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Player 1", this.padding * 3, 200);
      this.ctx.strokeText("Player 1", this.padding * 3, 200);
      this.ctx.fillText(this.selections[this.selector1.charIndex].name, this.padding * 3 , 250);

      if(this.selector2) {
        this.ctx.fillStyle = this.selector2.color;
        this.ctx.fillRect(this.selections[this.selector2.charIndex].x + this.portraitWidth / 2, this.selections[this.selector2.charIndex].y - 5,
                    (this.portraitWidth / 2) + 5, this.portraitWidth + 10);
      this.ctx.strokeStyle = "white";
      this.ctx.fillText("Player 2", WIDTH - this.padding * 3 - 150, 200);
      this.ctx.strokeText("Player 2", WIDTH - this.padding * 3 - 150, 200);
      this.ctx.fillText(this.selections[this.selector2.charIndex].name, WIDTH - this.padding * 3 - 150, 250);
      }
    }
    for (var i = 0; i < this.selections.length; i++) {
      this.ctx.drawImage(this.selections[i].portrait, this.selections[i].x, this.selections[i].y, 
        this.portraitWidth, this.portraitWidth);
    }

    drawTitle(this.ctx, "Character Select", 60);

    this.ctx.restore();
};

CharSelectScreen.prototype.handleInput = function (key, downEvent) {
  if(!downEvent) {
    switch (key) {
      case PLAYER1_CONTROLS.moveRight:
        ((this.selector1.charIndex + 1) < this.selections.length) ? this.selector1.charIndex++ : this.selector1.charIndex = 0;
        break;
      case PLAYER1_CONTROLS.moveLeft:
        (this.selector1.charIndex > 0) ? this.selector1.charIndex-- : this.selector1.charIndex = this.selections.length - 1;
        break;
      case PLAYER2_CONTROLS.moveRight:
          ((this.selector2.charIndex + 1) < this.selections.length) ? this.selector2.charIndex++ : this.selector2.charIndex = 0;
        break;
      case PLAYER2_CONTROLS.moveLeft:
        (this.selector2.charIndex > 0) ? this.selector2.charIndex-- : this.selector2.charIndex = this.selections.length - 1;
        break;
      default:
        if(key === PLAYER1_CONTROLS.punch || key === PLAYER1_CONTROLS.kick) this.player1Ready = true;
        if(key === PLAYER2_CONTROLS.punch || key === PLAYER2_CONTROLS.kick) this.player2Ready = true;
        break;
    }
  }
};

//--------------------------- END CHAR SELECT SCREEN ---------------------------------------------------
//-----------------------------BEGIN MODE SELECT SCREEN------------------------------------------------



//-----------------------------END MODE SELECT SCREEN------------------------------------------------
//-----------------------------BEGIN SCENE SELECT SCREEN-----------------------------------------------

function SceneSelect (gameEngine) {
  this.ctx = gameEngine.ctx;
  this.gameEngine = gameEngine;
  var portrait1 = AM.getAsset("./sprites/portrait1.png");
  var portrait2 = AM.getAsset("./sprites/portrait2.png");

  this.selections = [];
  this.selections.push({name: "Stickman", portrait: portrait1, x: 0, y:0});
  this.selections.push({name: "Jenkins", portrait: portrait2, x: 0, y: 0});

  this.selector1 = {x: 0, y: 0, color: "blue", charIndex: 0, selected: false};
}

SceneSelect.prototype.update = function () {

};

SceneSelect.prototype.draw = function () {
      drawTitle(this.ctx, "Scene Select", 60);

};
//-----------------------------END SCENE SELECT SCREEN-----------------------------------------------------
//---------------------------- BEGIN GAME SCREEN ----------------------------------------------------

function GameScreen (gameEngine) {
  this.ctx = gameEngine.ctx;
  this.surfaceWidth = gameEngine.surfaceWidth;
  this.surfaceHeight = gameEngine.surfaceHeight;
  this.gameOver = false;
  this.entities = [];
  this.background = null;
  startBackgroundAnimation(this, "./sprites/background3/", 36);
  this.gameEngine = gameEngine;
}

GameScreen.prototype.addPlayers = function (p1Name, p2Name) {
  if(p1Name === "Stickman") {
    var character = new Character(AM.getAsset("./sprites/sheet 2a.png"), AM.getAsset("./sprites/sheet 2b.png"),
                                AM.getAsset("./sprites/portrait1.png"), 1);
    this.addEntity(new Player(this.gameEngine, character,
                              50 , GROUND ,
                              HEALTH, PLAYER1_CONTROLS));
  } else if (p1Name === "Jenkins") {
    var character = new Character2(AM.getAsset("./sprites/sheet 3a.png"), AM.getAsset("./sprites/sheet 3b.png"),
                              AM.getAsset("./sprites/portrait2.png"), 1);
    this.addEntity(new Player(this.gameEngine, character,
                            50 , GROUND,
                            HEALTH, PLAYER1_CONTROLS));
  }

  if(p2Name === "Stickman") {
    var character = new Character(AM.getAsset("./sprites/sheet 2a.png"), AM.getAsset("./sprites/sheet 2b.png"),
                                AM.getAsset("./sprites/portrait1.png"), 2);
    this.addEntity(new Player(this.gameEngine, character,
                              WIDTH - FRAME_WIDTH - 50, GROUND,
                              HEALTH, PLAYER2_CONTROLS));
  } else if (p2Name === "Jenkins") {
      var character = new Character2(AM.getAsset("./sprites/sheet 3a.png"), AM.getAsset("./sprites/sheet 3b.png"),
                                AM.getAsset("./sprites/portrait2.png"), 2);
      this.addEntity(new Player(this.gameEngine, character,
                              WIDTH - FRAME_WIDTH - 50, GROUND,
                              HEALTH, PLAYER2_CONTROLS));
  }
};

GameScreen.prototype.addEntity = function (entity) {
    this.entities.push(entity);
};

GameScreen.prototype.update = function () {
  if(!this.gameOver) {
      var entitiesCount = this.entities.length;
      for (var i = 0; i < entitiesCount; i++) {
          var entity = this.entities[i];
          entity.update();
		  if (entity instanceof special && entity.x > WIDTH || entity.x + 100 < 0) {
			  this.entities.splice(i, 1);
			  entitiesCount--;
		  }
      }
  }
};

GameScreen.prototype.draw = function() {
  this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);

    if(this.background) this.ctx.drawImage(this.background, 0, 0, WIDTH, HEIGHT);

    this.ctx.save();
    for (var i = 0; i < this.entities.length; i++) {
		this.entities[i].draw(this.ctx);
		if (this.entities[i] instanceof Player) {
			this.ctx.save();
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
			this.ctx.restore();
			if(this.gameOver) {
				this.ctx.save();
				this.ctx.globalAlpha = 0.7;
				this.ctx.font = "45pt runed";
				this.ctx.strokeStyle = "white";
				this.ctx.textAlign = "center";
				this.ctx.strokeText("GAME OVER", WIDTH / 2, HEIGHT / 4);
				this.ctx.restore();
			}
		}
        
    }
    this.ctx.restore();
};


GameScreen.prototype.setBackground = function (background) {
    this.background = background;
};
//------------------------------------------- END GAME SCREEN -------------------------------------

function drawTitle (ctx, title, titleY) {
  ctx.save();
  canvas.style.background = "#39275B";
  ctx.font = "32px runed";
  ctx.textAlign ="center";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillText(title, WIDTH / 2, titleY);
  ctx.strokeText(title, WIDTH / 2, titleY);
  ctx.restore();
}