
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
    this.gameEngine.screen = new ModeSelect(this.gameEngine);
  }
  if(this.shadowBlur <= 2) this.shadowUp = true;
  if(this.shadowBlur >= 30) this.shadowUp = false;
  if(this.shadowUp) {
    this.shadowBlur += 2;
  } else {
    this.shadowBlur -= 2;
  }
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
  this.shadowBlur = 2;
  this.shadowUp = true;
  //this.countdown = 3;
  //this.countdownSet = false;
  this.interval;

  var portrait1 = AM.getAsset("./sprites/portrait1.png");
  var portrait2 = AM.getAsset("./sprites/portrait2.png");
  var portrait3 = AM.getAsset("./sprites/portrait3.png");
  var portrait4 = AM.getAsset("./sprites/portrait4.png");

  this.selections = [];
  this.selections.push({name: "Stickman", portrait: portrait1, x: 0, y:0});
  this.selections.push({name: "Jenkins", portrait: portrait2, x: 0, y: 0});
  this.selections.push({name: "Ephie", portrait: portrait3, x: 0, y: 0});
  this.selections.push({name: "Samuru", portrait: portrait4, x: 0, y: 0});

	this.selector1 = {x: 0, y: 0, color: "blue", charIndex: 0, selected: false};
  //if (gameEngine.mode === "localVS") 
  this.selector2 = {x: 0, y: 0, color: "red", charIndex: 0, selected: false};  
  var initX = Math.ceil((WIDTH - (this.portraitWidth + this.padding * 2) * this.selections.length) / 2);
  if(initX < this.padding) console.log("ERROR: SelectScreen portrait section starting x too small");
  //draw Stickman portraits
	for (var i = 0; i < this.selections.length; i++) {
		this.selections[i].x = initX + (this.portraitWidth + this.padding)* i;
		this.selections[i].y = this.titleHeight + 400;
	}
	
}

CharSelectScreen.prototype.update = function () {
  if(this.shadowBlur <= 2) this.shadowUp = true;
  if(this.shadowBlur >= 30) this.shadowUp = false;
  if(this.shadowUp) {
    this.shadowBlur += 2;
  } else {
    this.shadowBlur -= 2;
  }
  
};

CharSelectScreen.prototype.draw = function () {
    this.ctx.save();
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
        //draw selectors
    if(this.selections.length > 0) {
      this.ctx.fillStyle = this.selector1.color;
      if(this.player1Ready) {
        this.ctx.save();
        this.ctx.shadowBlur = this.shadowBlur;
        this.ctx.shadowColor = "white";
      } 
      this.ctx.fillRect(this.selections[this.selector1.charIndex].x - 5, this.selections[this.selector1.charIndex].y - 5, 
                  (this.portraitWidth / 2) + 5, this.portraitWidth + 10);
      if(this.player1Ready) this.ctx.restore();
      this.ctx.font = "24px runed";
      this.ctx.strokeStyle = this.selector1.color;
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Player 1", this.padding * 3, 200);
      this.ctx.strokeText("Player 1", this.padding * 3, 200);
      this.ctx.fillText(this.selections[this.selector1.charIndex].name, this.padding * 3 , 250);
	  if (this.player1Ready)  {
	  	this.ctx.fillText("*Selected*", this.padding * 3, 300);
	  }

    if(this.selector2) {
        this.ctx.fillStyle = this.selector2.color;
        if(this.player2Ready) {
          this.ctx.save();
          this.ctx.shadowBlur = this.shadowBlur;
          this.ctx.shadowColor = "white";
        }  
        this.ctx.fillRect(this.selections[this.selector2.charIndex].x + this.portraitWidth / 2, this.selections[this.selector2.charIndex].y - 5,
                    (this.portraitWidth / 2) + 5, this.portraitWidth + 10);
        if(this.player2Ready) this.ctx.restore();
        this.ctx.strokeStyle = "white";
        this.ctx.fillText("Player 2", WIDTH - this.padding * 3 - 150, 200);
        this.ctx.strokeText("Player 2", WIDTH - this.padding * 3 - 150, 200);
        this.ctx.fillText(this.selections[this.selector2.charIndex].name, WIDTH - this.padding * 3 - 150, 250);
  	    if (this.player2Ready)  {
  	  	  this.ctx.fillText("*Selected*", WIDTH - this.padding * 3 - 150, 300);
  	    }
      }
  }
  for (var i = 0; i < this.selections.length; i++) {
    this.ctx.drawImage(this.selections[i].portrait, this.selections[i].x, this.selections[i].y, 
      this.portraitWidth, this.portraitWidth);
  }
	
	if (this.player1Ready && this.player2Ready){
    this.ctx.save();
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.shadowColor = "white";
    this.ctx.shadowBlur = this.shadowBlur;
		this.ctx.fillText("Press any other key to continue", WIDTH / 2, 400);
    this.ctx.restore();
	}
  this.ctx.textAlign = "center";
  this.ctx.fillStyle = "white";
  this.ctx.font = "16px runed";
	this.ctx.fillText("Use move right and left to change selections.", WIDTH / 2, 100);
  this.ctx.fillText("Press punch to select, kick to deselect or go back", WIDTH / 2, 130);
  drawTitle(this.ctx, "Character Select", 60);
  this.ctx.restore();
};

CharSelectScreen.prototype.handleInput = function (key, downEvent) {
  if(!downEvent) {
    //console.log(this.player1Ready + " " + this.player2Ready);
    if(!this.player1Ready || !this.player2Ready) {
      switch (key) {  
        case PLAYER1_CONTROLS.moveRight:
          if(!this.player1Ready)
            ((this.selector1.charIndex + 1) < this.selections.length) ? this.selector1.charIndex++ : this.selector1.charIndex = 0;
          break;
        case PLAYER1_CONTROLS.moveLeft:
          if(!this.player1Ready)
            (this.selector1.charIndex > 0) ? this.selector1.charIndex-- : this.selector1.charIndex = this.selections.length - 1;
          break;
        case PLAYER2_CONTROLS.moveRight:
          if(!this.player2Ready)
            ((this.selector2.charIndex + 1) < this.selections.length) ? this.selector2.charIndex++ : this.selector2.charIndex = 0;
          break;
        case PLAYER2_CONTROLS.moveLeft:
          if(!this.player2Ready)
            (this.selector2.charIndex > 0) ? this.selector2.charIndex-- : this.selector2.charIndex = this.selections.length - 1;
          break;
        case PLAYER1_CONTROLS.punch:
          this.player1Ready = true;
          break;
        case PLAYER2_CONTROLS.punch:
          this.player2Ready = true;
          break;
        case PLAYER1_CONTROLS.kick:
          if(!this.player1Ready && !this.player2Ready) {
            this.gameEngine.screen = new SceneSelect(this.gameEngine);
          } else {
            this.player1Ready = false;
          }
          break;
        case PLAYER2_CONTROLS.kick:
          if(!this.player1Ready && !this.player2Ready) {
            this.gameEngine.screen = new SceneSelect(this.gameEngine);
          } else {
            this.player2Ready = false;
          }
          break;
      }
    } else {
      if(key === PLAYER1_CONTROLS.kick) { 
            this.player1Ready = false;

      } else if(key === PLAYER2_CONTROLS.kick){
            this.player2Ready = false;
      } else {
        var p1 = this.selections[this.selector1.charIndex];
        var p2 = this.selections[this.selector2.charIndex];
        var gs = new GameScreen(this.gameEngine);
        this.gameEngine.screen = gs;
        gs.addPlayers(p1.name, p2.name);
      }
    }
  }
};

//--------------------------- END CHAR SELECT SCREEN ---------------------------------------------------
//-----------------------------BEGIN MODE SELECT SCREEN------------------------------------------------
function ModeSelect (gameEngine) {
  this.titleHeight = 60;
  this.ctx = gameEngine.ctx;
  this.gameEngine = gameEngine;
  this.selections = [];
  this.entities = [this];
  this.shadowBlur = 2;
  this.shadowUp = false;
  this.ready = false;
  this.selections.push({name: "Local VS", value:"localVs", x:0, y:0});
  this.selections.push({name: "AI VS", value:"aiVs", x:0, y:0});
  this.selector1 = {x: 0, y: 0, color: "blue", index: 0};
  for (var i = 0; i < this.selections.length; i++) {
    this.selections[i].x =  WIDTH / 2;
    this.selections[i].y = 320 + (80)* i;
  }

}

ModeSelect.prototype.update = function() {
  this.selector1.x = this.selections[this.selector1.index].x;
  this.selector1.y = this.selections[this.selector1.index].y;
  if(this.shadowBlur <= 2) this.shadowUp = true;
  if(this.shadowBlur >= 30) this.shadowUp = false;
  this.shadowUp ?  this.shadowBlur += 2: this.shadowBlur -= 2;
};

ModeSelect.prototype.draw = function() {
  this.ctx.save();
  this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
  drawTitle(this.ctx, "Scene Select", 60);
  this.ctx.font = "22px runed";
  this.ctx.textAlign ="center";
  this.ctx.fillStyle = "white";
  this.ctx.strokeStyle = "white";
  this.ctx.lineWidth = "10px";
  // instruction
  this.ctx.fillText("Use Jump and Block to change selections.", WIDTH / 2, 100);
  this.ctx.fillText("Press punch to select, kick to deselect", WIDTH / 2, 130);

  if(this.ready) {
    this.ctx.save();
    this.ctx.shadowColor = "white";
    this.ctx.shadowBlur = this.shadowBlur;
    this.ctx.fillText("click any key to continue", WIDTH / 2, 180);
    this.ctx.restore();
  }
  for (var i = 0; i < this.selections.length; i++) {
    this.ctx.fillStyle = "gray";
    this.ctx.fillRect(this.selections[i].x - 70, this.selections[i].y - 35, 130, 50);
  }
  if(this.ready) {
    this.ctx.shadowColor = "white";
    this.ctx.shadowBlur = this.shadowBlur;
  }
  this.ctx.fillStyle = "blue";
  this.ctx.fillRect(this.selector1.x - 70, this.selector1.y - 35, 130, 50);

  for (var i = 0; i < this.selections.length; i++) {
    this.ctx.fillStyle = "white";
    this.ctx.fillText(this.selections[i].name, this.selections[i].x, this.selections[i].y);
  }
  this.ctx.restore();
};

ModeSelect.prototype.handleInput = function(key, downEvent) {
  if(!downEvent) {
    if(!this.ready) {
      switch (key) {
        case PLAYER2_CONTROLS.jump:
        case PLAYER1_CONTROLS.jump:
          ((this.selector1.index + 1) < this.selections.length) ? this.selector1.index++ : this.selector1.index = 0;
          break;
        case PLAYER2_CONTROLS.block:
        case PLAYER1_CONTROLS.block:
          (this.selector1.index > 0) ? this.selector1.index-- : this.selector1.index = this.selections.length - 1;
          break;
        case PLAYER2_CONTROLS.punch:
        case PLAYER1_CONTROLS.punch:
          this.ready = true;
          break;
        case PLAYER2_CONTROLS.kick:
        case PLAYER1_CONTROLS.kick:
          this.ready = false;
          break;
        default:
          break;
        }
    } else {
        switch (key) {
          case PLAYER2_CONTROLS.kick:
          case PLAYER1_CONTROLS.kick:
            this.ready = false;
            break;
          default:
            this.gameEngine.mode = this.selections[this.selector1.index].value;
            console.log(this.gameEngine.mode);
            this.gameEngine.screen = new SceneSelect(this.gameEngine);
            break;
        }
    }
  }
};

//-----------------------------END MODE SELECT SCREEN------------------------------------------------
//-----------------------------BEGIN SCENE SELECT SCREEN-----------------------------------------------

function SceneSelect (gameEngine) {
  this.ctx = gameEngine.ctx;
  this.gameEngine = gameEngine;
  var portrait0 = AM.getAsset("./sprites/background0/tmp-0.gif");
  var portrait1 = AM.getAsset("./sprites/background1/tmp-0.gif");
  var portrait2 = AM.getAsset("./sprites/background2/tmp-0.gif");
  var portrait3 = AM.getAsset("./sprites/background3/tmp-0.gif");
  this.player1Ready = false;
  this.portraitWidth = 90;
  this.titleHeight = 100;
  this.padding = 10;
  this.shadowBlur = 2;
  this.shadowUp = false;
  this.entities = [this];
  this.selections = [];
  this.selections.push({name: "Sunset", portrait: portrait0, x: 0, y:0});
  this.selections.push({name: "Ruins", portrait: portrait1, x: 0, y: 0});
  this.selections.push({name: "Under the Sea", portrait: portrait2, x: 0, y:0});
  this.selections.push({name: "Dark Fortress", portrait: portrait3, x: 0, y: 0});

  this.selector1 = {x: 0, y: 0, color: "blue", index: 0};

  for (var i = 0; i < this.selections.length; i++) {
    this.selections[i].x = 200 + (this.portraitWidth + this.padding)* i;
    this.selections[i].y = this.titleHeight + 200;
  }
}

SceneSelect.prototype.update = function () {
  if(this.shadowBlur <= 2) this.shadowUp = true;
  if(this.shadowBlur >= 30) this.shadowUp = false;
  this.shadowUp ?  this.shadowBlur += 2: this.shadowBlur -= 2;
};

SceneSelect.prototype.draw = function () {
    this.ctx.save();
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    drawTitle(this.ctx, "Scene Select", 60);
    this.ctx.font = "24px runed";
    this.ctx.textAlign ="center";
    this.ctx.fillStyle = "white";
    if(!this.player1Ready) {
      this.ctx.fillText("press punch to select a scene, kick to deselect", WIDTH / 2, 120);
    } else {
      this.ctx.save();
      this.ctx.shadowColor = "white";
      this.ctx.shadowBlur = this.shadowBlur;
      this.ctx.fillText("Scene Selected. Press any key to continue.", WIDTH / 2, 120);
      this.ctx.restore();
    }

    this.ctx.fillText(this.selections[this.selector1.index].name, WIDTH / 2, 190);
    this.ctx.fillStyle = "blue";
    if(this.player1Ready) {
      this.ctx.save();
      this.ctx.shadowColor = "white";
      this.ctx.shadowBlur = this.shadowBlur;
    }
    this.ctx.fillRect(this.selections[this.selector1.index].x - 5, this.selections[this.selector1.index].y - 5, 
                  (this.portraitWidth) + 10, this.portraitWidth + 10);
    if(this.player1Ready) {
      this.ctx.restore();
    }

    for (var i = 0; i < this.selections.length; i++) {
      this.ctx.drawImage(this.selections[i].portrait, this.selections[i].x, this.selections[i].y, 
        this.portraitWidth, this.portraitWidth);
    }
    this.ctx.restore();
};

SceneSelect.prototype.handleInput =  function (key, downEvent) {
  if(!downEvent) {
    if(!this.player1Ready) {
      switch (key) {
        case PLAYER1_CONTROLS.moveRight:
          ((this.selector1.index + 1) < this.selections.length) ? this.selector1.index++ : this.selector1.index = 0;
          break;
        case PLAYER1_CONTROLS.moveLeft:
          (this.selector1.index > 0) ? this.selector1.index-- : this.selector1.index = this.selections.length - 1;
          break;
        case PLAYER1_CONTROLS.punch:
        case PLAYER2_CONTROLS.punch:
          this.player1Ready = true;
          break;
        case PLAYER1_CONTROLS.kick:
        case PLAYER2_CONTROLS.kick:
            if (this.player1Ready) {
              this.player1Ready = false;
            } else {
              this.gameEngine.screen = new ModeSelect(this.gameEngine);
            }
        }
    } else {
      switch (key) {
        case PLAYER2_CONTROLS.kick:
        case PLAYER1_CONTROLS.kick:
          this.player1Ready = false;
          break;
        default:
          this.gameEngine.background = this.selector1.index;
          this.gameEngine.screen = new CharSelectScreen(this.gameEngine);
        break;
    }

    }
  }
};
//-----------------------------END SCENE SELECT SCREEN-----------------------------------------------------
//---------------------------- BEGIN GAME SCREEN ----------------------------------------------------

function GameScreen (gameEngine) {
  this.gameEngine = gameEngine;
  this.ctx = gameEngine.ctx;
  this.surfaceWidth = gameEngine.surfaceWidth;
  this.surfaceHeight = gameEngine.surfaceHeight;
  this.gameOver = false;
  this.winner = "";
  this.entities = [];
  this.background = null;
  this.backFrames = 0;
  switch (this.gameEngine.background) {
      case 0: this.backFrames = 36; break;
      case 1: this.backFrames = 8; break;
      case 2: this.backFrames = 27; break;
      case 3: this.bacFrames = 20; break;
      default: break;
  }
  startBackgroundAnimation(this, "./sprites/background" + this.gameEngine.background + "/", this.backFrames);
  this.gameEngine = gameEngine;
  this.printed = false;
}

GameScreen.prototype.addPlayers = function (p1Name, p2Name) {
  if(p1Name === "Stickman") {
	var character = new Stickman(AM.getAsset("./sprites/sheet 2a.png"), AM.getAsset("./sprites/sheet 2b.png"), AM.getAsset("./sprites/portrait1.png"), 1);
    this.addEntity(new Player(this.gameEngine, character,
                              50 , GROUND ,
                              HEALTH, PLAYER1_CONTROLS, "right"));
  } else if (p1Name === "Jenkins") {
    var jenkins = new Jenkins(AM.getAsset("./sprites/sheet 3a.png"), AM.getAsset("./sprites/sheet 3b.png"),
                              AM.getAsset("./sprites/portrait2.png"), 1);
    this.addEntity(new Player(this.gameEngine, jenkins,
                            50 , GROUND,
                            HEALTH, PLAYER1_CONTROLS, "right"));
  } else if (p1Name === "Ephie") {
	var ephie = new Ephie(AM.getAsset("./sprites/sheet 4a.png"), AM.getAsset("./sprites/sheet 4b.png"),
                              AM.getAsset("./sprites/portrait3.png"), 1);
	this.addEntity(new Player(this.gameEngine, ephie,
							50, GROUND,
							HEALTH, PLAYER1_CONTROLS, "right"));
  } else if (p1Name === "Samuru") {
	var samuru = new Samuru(AM.getAsset("./sprites/sheet 5a.png"), AM.getAsset("./sprites/sheet 5b.png"),
                              AM.getAsset("./sprites/portrait4.png"), 1);
	this.addEntity(new Player(this.gameEngine, samuru,
							50, GROUND,
							HEALTH, PLAYER1_CONTROLS, "right"));
  }

  if(p2Name === "Stickman") {
    var stickman = new Stickman(AM.getAsset("./sprites/sheet 2a.png"), AM.getAsset("./sprites/sheet 2b.png"),
                                AM.getAsset("./sprites/portrait1.png"), 2);
    if(this.gameEngine.mode === "localVs") {
      //console.log("localp2");
      this.addEntity(new Player(this.gameEngine, stickman,
                              WIDTH - FRAME_WIDTH - 50, GROUND,
                              HEALTH, PLAYER2_CONTROLS, "left"));
    } else {
      //console.log("aip2");
      this.addEntity(new aiPlayer(this.gameEngine, stickman,
                              WIDTH - FRAME_WIDTH - 50, GROUND,
                              HEALTH));
    }
  } else if (p2Name === "Jenkins") {
      var jenkins = new Jenkins(AM.getAsset("./sprites/sheet 3a.png"), AM.getAsset("./sprites/sheet 3b.png"),
                                AM.getAsset("./sprites/portrait2.png"), 2);
      if (this.gameEngine.mode === "localVs") {
        //console.log("localp2");
        this.addEntity(new Player(this.gameEngine, jenkins,
                              WIDTH - FRAME_WIDTH - 50, GROUND,
                              HEALTH, PLAYER2_CONTROLS, "left"));
      } else {
          //console.log("aip2");
          this.addEntity(new aiPlayer(this.gameEngine, jenkins,
                        WIDTH - FRAME_WIDTH - 50, GROUND,
                        HEALTH));
      }
  } else if (p2Name === "Ephie") {
	var ephie = new Ephie(AM.getAsset("./sprites/sheet 4a.png"), AM.getAsset("./sprites/sheet 4b.png"),
                              AM.getAsset("./sprites/portrait3.png"), 2);
    if (this.gameEngine.mode === "localVs") {
      //console.log("localp2");
      this.addEntity(new Player(this.gameEngine, ephie,
							WIDTH - FRAME_WIDTH - 50, GROUND,
							HEALTH, PLAYER2_CONTROLS, "left"));
    } else {
        //console.log("aip2");
        this.addEntity(new aiPlayer(this.gameEngine, ephie,
          WIDTH - FRAME_WIDTH - 50, GROUND,
          HEALTH));
    }
  } else if (p2Name === "Samuru") {
	var samuru = new Samuru(AM.getAsset("./sprites/sheet 5a.png"), AM.getAsset("./sprites/sheet 5b.png"),
                              AM.getAsset("./sprites/portrait4.png"), 2);
    if (this.gameEngine.mode === "localVs") {
      //console.log("localp2");
      this.addEntity(new Player(this.gameEngine, samuru,
  							WIDTH - FRAME_WIDTH - 50, GROUND,
  							HEALTH, PLAYER2_CONTROLS, "left"));
    } else {
      //console.log("aip2");
      this.addEntity(new aiPlayer(this.gameEngine, samuru,
                WIDTH - FRAME_WIDTH - 50, GROUND,
                HEALTH));     
    }
  }
};

GameScreen.prototype.addEntity = function (entity) {
    var savedFacing = entity.facing;
    entity.facing = "right";
    entity.draw();
    entity.facing = "left";
    entity.draw();
    entity.state = "lose";
    entity.draw();
    entity.facing = "right";
    entity.draw();
    entity.state = "idle";
    entity.facing = savedFacing;
    this.entities.push(entity);
};

GameScreen.prototype.update = function () {
  if(!this.gameOver) {
      var entitiesCount = this.entities.length;
      for (var i = 0; i < entitiesCount; i++) {
          var entity = this.entities[i];
          entity.update();
		  if (entity instanceof special && entity.x > WIDTH || entity.x + 200 < 0) {
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
    }
    var player1 = this.entities[0];
    var player2 = this.entities[1];
		this.ctx.drawImage(player1.character.portrait, 40, 30, 73, 73);
    this.ctx.drawImage(player2.character.portrait, 687, 30, 73, 73);

    var bar1 = AM.getAsset("./sprites/healthbar.png");
    var bar2 = AM.getAsset("./sprites/healthbar2.png");
    this.ctx.drawImage(bar1, 0, 0, 395, 133,          //source
                              0, 0, 395, 133);        //canvas
    this.ctx.drawImage(bar2, 0, 0, 395, 133,          //source
                              405, 0, 395, 133);      //canvas

    var hpPercent1 = (Math.ceil(player1.health) / 100) * 244 + 1;
    var hpPercent2 = (Math.ceil(player2.health) / 100) * 244 + 1;
    this.ctx.drawImage(bar1, 122, 163, hpPercent1, 28,
                              122, 30, hpPercent1, 28);
    this.ctx.drawImage(bar2, 29 + (244 - hpPercent2), 163, hpPercent2, 28,
                              434 + (244 - hpPercent2), 30, hpPercent2, 28);

    var ePercent1 = (Math.ceil(player1.energy) / 100) * 244 + 1;
    var ePercent2 = (Math.ceil(player2.energy) / 100) * 244 + 1;
		this.ctx.drawImage(bar1, 122, 203, ePercent1, 29,
                              122, 70, ePercent1, 29);
		this.ctx.drawImage(bar2, 29 + (244 - ePercent2), 203, ePercent2, 29,
                              434 + (244 - ePercent2), 70, ePercent2, 29);
	
    

		if(this.gameOver) {
			this.ctx.save();
			this.ctx.globalAlpha = 0.7;
			this.ctx.font = "45pt runed";
			this.ctx.strokeStyle = "black";
			this.ctx.fillStyle = "white";
			this.ctx.textAlign = "center";
			this.ctx.fillText("GAME OVER", WIDTH / 2, HEIGHT / 4);
			this.ctx.strokeText("GAME OVER", WIDTH / 2, HEIGHT / 4);
			this.ctx.font = "36pt runed";
			this.ctx.fillText("PLAYER " + this.winner + " WINS!", WIDTH / 2, HEIGHT / 3);
			this.ctx.strokeText("PLAYER " + this.winner + " WINS!", WIDTH / 2, HEIGHT / 3);
      var that = this;
      window.setTimeout(function() {
          that.winDone = true;
          //console.log("time");
      }, 1000);
      if(this.winDone) {
        this.ctx.fillText("Press any key to", WIDTH / 2, HEIGHT / 2);
        this.ctx.strokeText("Press any key to", WIDTH / 2, HEIGHT / 2);
        this.ctx.fillText("return to the main menu", WIDTH / 2, HEIGHT / 2 + 50);
        this.ctx.strokeText("return to the main menu", WIDTH / 2, HEIGHT / 2 + 50);
      }
      this.ctx.restore();

		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i] instanceof special) {
				this.entities.splice(i, 1);
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