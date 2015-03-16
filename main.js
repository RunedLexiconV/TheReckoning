AM.queueImage("./sprites/runedlogo.png");
AM.queueImage("./sprites/sheet 2a.png");
AM.queueImage("./sprites/sheet 2b.png");
AM.queueImage("./sprites/sheet 3a.png");
AM.queueImage("./sprites/sheet 3b.png");
AM.queueImage("./sprites/sheet 4a.png");
AM.queueImage("./sprites/sheet 4b.png");
AM.queueImage("./sprites/sheet 5a.png");
AM.queueImage("./sprites/sheet 5b.png");
AM.queueImage("./sprites/sheet 5c.png");
AM.queueImage("./sprites/sheet 5d.png");
AM.queueImage("./sprites/portrait1.png");
AM.queueImage("./sprites/portrait2.png");
AM.queueImage("./sprites/healthbar.png");
AM.queueImage("./sprites/healthbar2.png");
AM.queueImage("./sprites/portrait3.png");
AM.queueImage("./sprites/portrait4.png");
loadBackground("./sprites/background0/", 36);
loadBackground("./sprites/background1/", 8);
loadBackground("./sprites/background2/", 27);
loadBackground("./sprites/background3/", 20);
AM.queueAudio("./sound/Dirtiest - Genoshan Massacre.mp3");
AM.queueAudio("./sound/End of peace.mp3");
AM.queueAudio("./sound/Robot on Drabgon.mp3");
AM.queueAudio("./sound/getting-hit.mp3");
AM.queueAudio("./sound/melee-attack.mp3");
AM.queueAudio("./sound/elephant.mp3");
AM.queueAudio("./sound/oh-yeah.mp3");
AM.queueAudio("./sound/yeehaw.mp3");
AM.queueAudio("./sound/sword.mp3");
AM.queueAudio("./sound/ele-hit.mp3");
AM.queueAudio("./sound/kung-kick.mp3");
AM.queueAudio("./sound/kung-kick2.mp3");
AM.queueAudio("./sound/sam-win.mp3");

AM.queueAudio("./sound/stickman/hit 1.mp3");
AM.queueAudio("./sound/stickman/hit 2.mp3");
AM.queueAudio("./sound/stickman/hit 3.mp3");
AM.queueAudio("./sound/stickman/hurt.mp3");
AM.queueAudio("./sound/stickman/jumpKick.mp3");
AM.queueAudio("./sound/stickman/kick1.mp3");
AM.queueAudio("./sound/stickman/kick2.mp3");
AM.queueAudio("./sound/stickman/kick3.mp3");

AM.queueAudio("./sound/jenkins/hit1.mp3");
AM.queueAudio("./sound/jenkins/hit2.mp3");
AM.queueAudio("./sound/jenkins/hit3.mp3");
AM.queueAudio("./sound/jenkins/hurt.mp3");
AM.queueAudio("./sound/jenkins/jumpKick.mp3");
AM.queueAudio("./sound/jenkins/kick_1.mp3");
AM.queueAudio("./sound/jenkins/kick_2.mp3");
AM.queueAudio("./sound/jenkins/kick_3.mp3");

AM.queueAudio("./sound/samuru/hit_1.mp3");
AM.queueAudio("./sound/samuru/hit_2.mp3");
AM.queueAudio("./sound/samuru/hit_3.mp3");
AM.queueAudio("./sound/samuru/hurt.mp3");
AM.queueAudio("./sound/samuru/jumpKick.mp3");
AM.queueAudio("./sound/samuru/kick_1.mp3");
AM.queueAudio("./sound/samuru/kick_2.mp3");
AM.queueAudio("./sound/samuru/kick_3.mp3");

window.onload = function () {
  AM.downloadAll( function () {
    var canvas = document.getElementById("canvas");
    canvas.setAttribute("width", WIDTH + "px");
    canvas.setAttribute("height",  HEIGHT + "px");
    canvas.style.background = "#39275B";
    var ctx = canvas.getContext("2d");
    canvas.focus();
    
    var musicPlayer = new MusicPlayer();


    var gameEngine = new GameEngine();
    var timer = null;
    var background = 0;
    musicPlayer.init();
    musicPlayer.play();
    gameEngine.init(ctx);
    gameEngine.startInput();
    gameEngine.start();
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
