function MusicPlayer (music) {
	this.music = music;
	this.playlist = [];
	this.track = 0;
	this.shuffle = true;
}

MusicPlayer.prototype.addSong = function (path) {
	this.playlist.push(path);
};

MusicPlayer.prototype.init = function () {

	if(shuffle) {
		this.music.addEventListener("ended", function() {
			(this.playlist.length < track + 1) ? setTrack(track++) : setTrack(0);
		});
	}
};

MusicPlayer.prototype.setTrack = function (track) {
	if (this.playlist[track]) {
		this.music.pause();
		this.track = track;
		this.music.setAttribute("src", playlist[0]);
		this.music.play();
	} 
};

MusicPlayer.prototype.play = function () {
	this.music.play();
};
