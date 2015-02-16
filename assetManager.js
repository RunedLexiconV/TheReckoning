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
    if(this.audioQueue.length  + this.imageQueue.length >= this.successCount + this.errorCount) console.log("done with downloads");
    return this.audioQueue.length  + this.imageQueue.length >= this.successCount + this.errorCount;
}

AssetManager.prototype.downloadAll = function (callback) {
    for (var i = 0; i < this.imageQueue.length; i++) {
        console.log("downloading: " + this.imageQueue[i]);
        var img = new Image();
        var that = this;
        var path = this.imageQueue[i];
        img.addEventListener("load", function () {
            console.log("success loading: " + that.imageQueue[i]);
            that.successCount++;
            if(that.isDone()) callback();
        });
        img.addEventListener("error", function () {
            console.log("error loading: " + that.imageQueue[i]);
            that.errorCount++;
            if (that.isDone()) callback();
        });
        img.src = path;
        this.cache[path] = img;
    }

    for (var i = 0; i < this.audioQueue.length; i++) {
        console.log("downloading: " + this.audioQueue[i]);
        var audio = new Audio();
        var that = this;
        var path = this.audioQueue[i];
        audio.addEventListener("load", function () {
            console.log("success loading: " + that.audioQueue[i]);
            that.successCount++;
            if(that.isDone()) callback();
        });
        audio.addEventListener("error", function () {
            console.log("error loading: " + that.audioQueue[i]);
            that.errorCount++;
            if (that.isDone()) callback();
        });
        audio.src = path;
        this.cache[path] = audio;
    }

}

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
}