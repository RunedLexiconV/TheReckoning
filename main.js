var AM = new AssetManager();
var SCALE= 1;
var WIDTH = 800;
var HEIGHT = 600;
var GROUND = 500;
var HEALTH = 100;

AM.queueDownload("./sprites/Battle_Arena_Background.jpg");
AM.queueDownload("./sound/Dirtiest - Genoshan Massacre.mp3");
AM.queueDownload("./sprites/runedlogo.png");
AM.queueDownload("./sprites/sheet 2a.png");

AM.downloadAll( function () {
	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", WIDTH + "px");
	canvas.setAttribute("height",  HEIGHT + "px");
    var ctx = canvas.getContext("2d");
    var music = document.createElement("audio");
    music.setAttribute("src","./sound/Dirtiest - Genoshan Massacre.mp3");
    var gameEngine = new GameEngine();

    //start screen
    canvas.style.background = "#39275B";
    ctx.drawImage(AM.getAsset("./sprites/runedlogo.png"), 100, 100, 600, 200);

    ctx.save();
    ctx.font = "20px runed";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "white";
  	ctx.fillText("Press any key to continue...", 270, 400);
    ctx.restore();

  	// music.play();
    var that = this;
  	var startGameListener = function (e) {
	  	//start game
	    gameEngine.init(ctx);
	   	gameEngine.start();
	    gameEngine.setBackground(AM.getAsset("./sprites/Battle_Arena_Background.jpg"));
	  	gameEngine.startInput();
      document.getElementById("canvas").focus();

      var character1 = new Character(AM.getAsset("./sprites/sheet 2a.png"));
      gameEngine.addEntity(new Player(gameEngine, character1,
                                      50 , GROUND - FRAME_HEIGHT,
                                      HEALTH, PLAYER1_CONTROLS));

	  	window.removeEventListener("keydown", startGameListener, false);
  	};
  	window.addEventListener("keydown", startGameListener, false);
});

