function MusicPlayer () {
	this.playlist = [];
	this.track = 0;
	this.shuffle = true;
	this.paused = false;
	this.music = null;
}

MusicPlayer.prototype.addSong = function (path) {
	this.playlist.push(path);
};

MusicPlayer.prototype.init = function () {
	this.music = this.playlist[0];
	var that = this;
	if(this.shuffle) {
		this.music.addEventListener("ended", function() {
			(that.playlist.length > that.track + 1) ? that.setTrack(that.track+1) : that.setTrack(0);
		});
	}
	window.addEventListener("keyup", function(e) {
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if(key === "m") {
			(that.paused) ? that.music.play() : that.music.pause();
			that.paused = !that.paused;
		}
	})
};

MusicPlayer.prototype.setTrack = function (track) {
	if (this.playlist[track]) {
		this.music.pause();
		this.track = track;
		this.music = this.playlist[track];
		if(this.shuffle) {
			this.music.addEventListener("ended", function() {
				(that.playlist.length > that.track + 1) ? that.setTrack(that.track+1) : that.setTrack(0);
		});
	}
		this.music.play();
	} 
};

MusicPlayer.prototype.play = function () {
	this.music.play();
};

