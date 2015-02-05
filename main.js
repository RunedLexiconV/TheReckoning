var AM = new AssetManager();
var SCALE= 1;
var WIDTH = 800;
var HEIGHT = 600;
var GROUND = 700;

AM.queueAsset("./sprites/Battle_Arena_Background.jpg");

AM.downloadAll( function () {
	var canvas = document.getElementById("canvas");
	canvas.setAttribute("width", WIDTH + "px");
	canvas.setAttribute("height",  HEIGHT + "px");
    var ctx = canvas.getContext("2d");
    var gameEngine = new GameEngine();

    gameEngine.init(ctx);
   	gameEngine.start();
    gameEngine.setBackground(AM.getAsset("./sprites/Battle_Arena_Background.jpg"));
  	gameEngine.startInput();
});
