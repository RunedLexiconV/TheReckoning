function MusicPlayer (music) {
	this.music = music;
	this.playlist = [];
	this.track = 0;
	this.shuffle = true;
	this.paused = false;
}

MusicPlayer.prototype.addSong = function (path) {
	this.playlist.push(path);
};

MusicPlayer.prototype.init = function () {
	//console.log(this.music);
	this.setTrack(0);
	var that = this;
	if(this.shuffle) {
		this.music.addEventListener("ended", function() {
			(that.playlist.length < that.track + 1) ? that.setTrack(that.track+1) : that.setTrack(0);
		});
	}
	var that = this;
	window.addEventListener("keyup", function(e) {
		var key = String.fromCharCode(event.keyCode).toLowerCase();
		if(key === "m") {
			(that.paused) ? that.music.play() : that.music.pause();
			that.paused = !that.paused;
		}
	})
};

MusicPlayer.prototype.setTrack = function (track) {
	//console.log(track);
	if (this.playlist[track]) {
		this.music.pause();
		this.track = track;
		this.music.setAttribute("src", this.playlist[track]);
		this.music.play();
	} 
};

MusicPlayer.prototype.play = function () {
	this.music.play();
};

