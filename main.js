var AM = new AssetManager();
var WIDTH = 800;
var HEIGHT = 600;
var GROUND = 610;
var HEALTH = 100;

AM.queueImage("./sprites/Battle_Arena_Background.jpg");
AM.queueImage("./sprites/runedlogo.png");
AM.queueImage("./sprites/sheet 2a.png");
AM.queueImage("./sprites/sheet 2b.png");
AM.queueImage("./sprites/sheet 3a.png");
AM.queueImage("./sprites/sheet 3b.png");
AM.queueImage("./sprites/portrait1.png");
AM.queueImage("./sprites/portrait2.png");
loadBackground("./sprites/background0/", 36);
loadBackground("./sprites/background1/", 8);
AM.queueAudio("./sound/Dirtiest - Genoshan Massacre.mp3");
AM.queueAudio("./sound/End of peace.mp3");
AM.queueAudio("./sound/06 Hidden Shrine.mp3");
AM.queueAudio("./sound/Robot on Drabgon.mp3");

AM.downloadAll( function () {
  var canvas = document.getElementById("canvas");
  canvas.setAttribute("width", WIDTH + "px");
  canvas.setAttribute("height",  HEIGHT + "px");
  var ctx = canvas.getContext("2d");
  // var music = document.createElement("audio");
  // canvas.appendChild(music);
  //music.setAttribute("src","./sound/Dirtiest - Genoshan Massacre.mp3");
  var musicPlayer = new MusicPlayer();
  musicPlayer.addSong(AM.getAsset("./sound/End of peace.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/Dirtiest - Genoshan Massacre.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/06 Hidden Shrine.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/Robot on Drabgon.mp3"));

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
  var timer = null;
  var background = 0;
  musicPlayer.init();
  musicPlayer.play();
  gameEngine.init(ctx);

    var startGameListener = function (e) {
      //start game
      gameEngine.init(ctx);
      document.getElementById("canvas").focus();
      timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", 36);
      var character1 = new Character(AM.getAsset("./sprites/sheet 2a.png"),
                                      AM.getAsset("./sprites/portrait1.png"),
                                      1);
      gameEngine.addEntity(new Player(gameEngine, character1,
                                      50 , GROUND - FRAME_HEIGHT * SCALE,
                                      HEALTH, PLAYER1_CONTROLS));
      var character2 = new Character2(AM.getAsset("./sprites/sheet 3b.png"),
                                      AM.getAsset("./sprites/portrait2.png"),
                                      2);
      gameEngine.addEntity(new Player(gameEngine, character2,
                                      WIDTH - FRAME_WIDTH - 50 , GROUND - FRAME_HEIGHT * SCALE,
                                      HEALTH, PLAYER2_CONTROLS));
      window.removeEventListener("keydown", startGameListener, false);
      window.addEventListener("keyup", function (event) {
        var key = String.fromCharCode(event.keyCode).toLowerCase();
        if(key === 'q') {
          if(timer) {
            window.clearInterval(timer);
          }
          background = (background + 1) % 2;
          var frames = background === 0 ? 36 : 8;
          timer = startBackgroundAnimation(gameEngine, "./sprites/background"+background+"/", frames);
        }
      });
      gameEngine.start();
      gameEngine.startInput();

    };
    window.addEventListener("keydown", startGameListener, false);
});

function loadBackground(path, frames) {
  for(var i = 0; i < frames; i++) { 
    AM.queueImage(path+"tmp-"+i+".gif");
  }
}

function startBackgroundAnimation(gameEngine, folder, frames) {
  var i = 0;
  var reverse = false;
  var id = window.setInterval(function () {
    gameEngine.setBackground(AM.getAsset(folder+"tmp-"+i+".gif"));
    i + 1 < frames ? i++ : i = 0;
  }, 200);
  return id;
}
