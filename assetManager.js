function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.imageQueue = [];
    this.audioQueue = [];
}

AssetManager.prototype.queueImage = function (path) {
    this.imageQueue.push(path);
}

AssetManager.prototype.queueAudio = function (path) {
    this.audioQueue.push(path);
}

AssetManager.prototype.isDone = function () { 
    if(this.audioQueue.length  + this.imageQueue.length === this.successCount + this.errorCount) console.log("done with downloads");
    return this.audioQueue.length  + this.imageQueue.length === this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	ctx.save();
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	ctx.fillStyle = "black";
	ctx.strokeStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText("LOADING...", WIDTH / 2, 500);
	ctx.strokeText("LOADING...", WIDTH / 2, 500);
	ctx.restore();
	
	for (var i = 0; i < this.imageQueue.length; i++) {
		//console.log("downloading: " + this.imageQueue[i]);
		var img = new Image();
		var that = this;
		var path = this.imageQueue[i];
		img.addEventListener("load", function (e) {
			//console.log("success loading: " + that.imageQueue[i]);
			that.successCount++;
			if(that.isDone()) callback();
			e.target.removeEventListener(e.type, arguments.callee);
		});
		img.addEventListener("error", function (e) {
			//console.log("error loading: " + that.imageQueue[i]);
			that.errorCount++;
			if (that.isDone()) callback();
			e.target.removeEventListener(e.type, arguments.callee);
		});
		img.src = path;
		this.cache[path] = img;
	}

	for (var i = 0; i < this.audioQueue.length; i++) {
		//console.log("downloading: " + this.audioQueue[i]);
		var audio = new Audio();
		var that = this;
		var path = this.audioQueue[i];

		audio.addEventListener("loadeddata", function (e) {
			//console.log("success loading: " + that.audioQueue[i]);
			that.successCount++;
			if(that.isDone()) callback();
			e.target.removeEventListener(e.type, arguments.callee);
		});
		audio.addEventListener("error", function (e) {
			//console.log("error loading: " + that.audioQueue[i]);
			that.errorCount++;
			if (that.isDone()) callback();
			e.target.removeEventListener(e.type, arguments.callee);
		});
		audio.src = path;
		this.cache[path] = audio;
	}
    
	
}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}