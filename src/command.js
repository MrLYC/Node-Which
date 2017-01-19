var fs = require("fs");
var path = require("path");

var S_IXUSR = 100;  // execute/search permission, owner

function OsCompatibility() {
    var whichOs = require("which-os");
    var osName = whichOs();
    if (osName.search("^[wW]indow") === 0) {
        this.pathsep = ";";
        this.sep = "\\";
    } else {
        this.pathsep = ":";
        this.sep = "/";
    }
}

var Command = module.exports = function Command (name) {
    this.name = name;
};

var osCompatibility = new OsCompatibility();

Command.prototype.pathList = function () {
    var path = process.env.PATH || "";
    return path.split(osCompatibility.pathsep);
}

Command.prototype.isExecutable = function (filename) {
    var result = false;
    var stats = null;

    try {
        stats = fs.statSync(filename);
    } catch (err) {
        return false;
    };

    if (typeof(stats) == "undefined") {
        return false;
    }

    if (stats.mode & S_IXUSR) {
        return true;
    }
    return false;
}

Command.prototype.find = function (cb, all) {
    var pathList = this.pathList();

    for (var i in pathList) {
        var root = pathList[i];
        if (this.isExecutable(path.join(root, this.name))) {
            cb(this, root);

            if (!all) {
                break;
            }
        }
    }
}
