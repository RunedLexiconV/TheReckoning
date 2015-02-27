function startScreen (ctx) {
  canvas.style.background = "#39275B";
  ctx.drawImage(AM.getAsset("./sprites/runedlogo.png"), 100, 100, 600, 200);
  ctx.save();
  ctx.font = "20px runed";
  ctx.shadowColor = "white";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "white";
  ctx.fillText("Press any key to continue...", 270, 400);
  ctx.restore();
}


var startGame = function (e) {
  gameEngine.start();
  gameEngine.startInput();
  document.getElementById("canvas").focus();
  timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", 36);
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
      timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", frames);
    }
  });
};



// selections is an array of objects that hold a portrait and a callback for when the portrait is selected.
// selection objects should be in the form {name: , portrait: , callback: }
// both is a boolean, if false it means only one player can select something, 
// if true both players need to make a selection
function SelectScreen (title, selections, ctx, both, width, height, callback) {
  var titleHeight = 50,
      portraitWidth = 75,
      padding = 10;

  drawTitle(ctx, titleHeight, width);

  this.selections = selections;
	this.selector1 = {x: 0, y: 0, color: "blue", charIndex: 0, selected: false};
  if (both) this.selector2 = {x: 0, y: 0, color: "red", charIndex: 0, selected: false};  
  var initX = Math.ceil((width - (portraitWidth + padding * 2) * selections.length) / 2)
  if(initX < padding) console.log("ERROR: SelectScreen portrait section starting x too small");
  //draw character portraits
	for (var i = 0; selections.length; i++) {
    this.selections[i].x = initX + (portraitWidth + padding)* i 
    this.selections[i].y = titleHeight + 100;
	}
  function draw() {
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; selections.length; i++) {
      ctx.drawImage(AM.getAsset(this.selections[i].portrait), this.selections[i].x, this.selections[i].y, portraitWidth, portraitWidth);
    }

    //draw selectors
    if(this.selections.length > 0) {
      ctx.fillStyle = this.selector1.color;
      ctx.drawRect(this.selections[this.selector1.charIndex].x - 5, this.selections[this.selector1.charIndex].y - 5, 
                  (portraitWidth / 2) + 5, portraitWidth + 10);
      if(this.selector2) {
        ctx.fillStyle = this.selector2.color;
        ctx.drawRect(this.selections[this.selector1.charIndex].x + portraitWidth / 2, this.selections[this.selector1.charIndex].y - 5,
                    portraitWidth + 5, portraitWidth + 10);
      }
    }
    ctx.restore();
  }
  draw();
  var handler = function (e) {
    var key = String.fromCharCode(e.keyCode).toLowerCase();
    switch (key) {
    case PLAYER1_CONTROLS.moveRight:
      (the.selector1.charIndex < this.selections.length) ? this.selector1.charIndex++ : this.selector1.charIndex = 0;
      break;
    case PLAYER1_CONTROLS.moveLeft:
      (the.selector1.charIndex > 0) ? this.selector1.charIndex-- : this.selector1.charIndex = this.selections.length - 1;
      break;
    case PLAYER2_CONTROLS.moveRight:
        (the.selector2.charIndex < this.selections.length) ? this.selector2.charIndex++ : this.selector2.charIndex = 0;
      break;
    case PLAYER2_CONTROLS.moveLeft:
      (the.selector2.charIndex > 0) ? this.selector2.charIndex-- : this.selector2.charIndex = this.selections.length - 1;
      break;
    default:
      if(key === PLAYER1_CONTROLS.punch || key === PLAYER1_CONTROLS.kick) player1Ready = true;
      if(key === PLAYER2_CONTROLS.punch || key === PLAYER2_CONTROLS.kick) player2Ready = true;
      if(player1Ready && player2Ready)  {
        window.removeEventListener("keyup", handler);
        startGame();
        callback();
      }
      break;
      draw();
  }
  }
	window.addEventListener("keyup", handler);
}

// function modeSelect(ctx, title) {
//   drawTitle(ctx, title, )
// }


function drawTitle (ctx, title, titleHeight, width) {
  ctx.save();
  canvas.style.background = "#39275B";
  ctx.font = "30px runed";
  ctx.textAlign ="center";
  ctx.shadowColor = "black";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.fillText(title, width / 2, titleHeight);
  ctx.strokeText(title, width / 2, titleHeight);
  ctx.restore();
}