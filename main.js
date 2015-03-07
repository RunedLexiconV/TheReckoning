var AM = new AssetManager();
var WIDTH = 800;
var HEIGHT = 600;
var GROUND = 520;
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
loadBackground("./sprites/background2/", 56);
loadBackground("./sprites/background3/", 40);
AM.queueAudio("./sound/Dirtiest - Genoshan Massacre.mp3");
AM.queueAudio("./sound/End of peace.mp3");
AM.queueAudio("./sound/06 Hidden Shrine.mp3");
AM.queueAudio("./sound/Robot on Drabgon.mp3");

window.onload = function () {
  AM.downloadAll( function () {
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("width", WIDTH + "px");
    canvas.setAttribute("height",  HEIGHT + "px");
    canvas.style.background = "#39275B";
    var ctx = canvas.getContext("2d");
    
    var musicPlayer = new MusicPlayer();


    var gameEngine = new GameEngine();
    var timer = null;
    var background = 0;
    musicPlayer.init();
    musicPlayer.play();
    gameEngine.init(ctx);
    gameEngine.startInput();
    gameEngine.start();

    /*
    var character1 = new Character(AM.getAsset("./sprites/sheet 2a.png"),
                                    AM.getAsset("./sprites/portrait1.png"), 1);
    var character2 = new Character2(AM.getAsset("./sprites/sheet 3b.png"),
                                    AM.getAsset("./sprites/portrait2.png"), 2);
    var characters = [];
    characters.push(character1);
    characters.push(character2);
    var selections = [];

    selections.push({name: "Stickman", portrait: "./sprites/portrait1.png", callback: call});
    selections.push({name: "Jenkins", portrait: "./sprites/portrait2.png", callback: call});
    */
  }); 
};

function loadBackground(path, frames) {
  for(var i = 0; i < frames; i++) { 
    AM.queueImage(path+"tmp-"+i+".gif");
  }
}

function startBackgroundAnimation(screen, folder, frames) {
  var i = 0;
  var reverse = false;
  var id = window.setInterval(function () {
    screen.setBackground(AM.getAsset(folder+"tmp-"+i+".gif"));
    (i + 1) < frames ? i++ : i = 0;
  }, 200);
  return id;
}
