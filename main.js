var AM = new AssetManager();
var SCALE= 1;
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
  
  var musicPlayer = new MusicPlayer();
  musicPlayer.addSong(AM.getAsset("./sound/End of peace.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/Dirtiest - Genoshan Massacre.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/06 Hidden Shrine.mp3"));
  musicPlayer.addSong(AM.getAsset("./sound/Robot on Drabgon.mp3"));

  var gameEngine = new GameEngine();

  //start screen
  startScreen(ctx);
  var timer = null;
  var background = 0;
  musicPlayer.init();
  musicPlayer.play();
  gameEngine.init(ctx);
  var character1 = new Character(AM.getAsset("./sprites/sheet 2a.png"),
                                  AM.getAsset("./sprites/portrait1.png"), 1);
  var character2 = new Character2(AM.getAsset("./sprites/sheet 3b.png"),
                                  AM.getAsset("./sprites/portrait2.png"), 2);
  var characters = [];
  characters.push(character1);
  characters.push(character2);
  var selections = [];
  var call = function () {
    console.log("");
  };
  selections.push({name: "Stickman", portrait: "./sprites/portrait1.png", callback: call})
  selections.push
  
  var startHandler = function (e) {
    SelectScreen("Character Select", )
    window.removeEventListenr("keyup", startHandler);
  }
  window.addEventListener("keyup", startHandler);
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
