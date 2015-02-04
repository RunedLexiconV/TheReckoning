/*
	Queues assets for loading, allows you to make sure everything is loaded
	before starting the game
*/
function AssetManager() {
	this.downloadQueue = [];
	this.cache = [];
	this.successCount = 0;
	this.errorCount = 0;
}

AssetManager.prototype.queueAsset = function(path) {
	this.downloadQueue.push(path);
	console.log("queued :  " + path);
};

/// downloads all files from downloadQueue then calls the callback func
AssetManager.prototype.downloadAll = function(callback) {
	for (var i = 0; i < this.downloadQueue.length; i++) {
		var path = this.downloadQueue[i];
		var img = new Image();
		var that = this;
		img.addEventListener("load", function(){
			that.successCount++;
			if (that.isDone()) {callback();}
		});
		img.addEventListener("error",function(){
			that.errorCount++;
			if (that.isDone()) callback();
		});
		img.src = path;
		this.cache[path]= img; 
	};


};

AssetManager.prototype.isDone = function() {
	return this.successCount + this.errorCount === this.downloadQueue.length;
 };

AssetManager.prototype.getAsset = function(path) {
	return this.cache[path];
};

