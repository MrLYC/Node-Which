var fs = require("fs");
var path = require("path");

var S_IXUSR = 100;  // execute/search permission, owner

function OsCompatibility() {
    var which_os = require("which-os");
    var os_name = which_os();
    if (os_name.search("^[wW]indow") === 0) {
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

var os_compatibility = new OsCompatibility();

Command.prototype.path_list = function () {
    var path = process.env.PATH || "";
    return path.split(os_compatibility.pathsep);
}

Command.prototype.is_executable = function (filename) {
    var result = false;

    try {
        var stats = fs.statSync(filename);
    } catch (err) {
        return false;
    };

    if (typeof(stats) == 'undefined') {
        return false;
    }

    if (stats.mode & S_IXUSR) {
        return true;
    }
    return false;
}

Command.prototype.find = function (cb, all) {
    var path_list = this.path_list();

    for (var i in path_list) {
        var root = path_list[i];
        if (this.is_executable(path.join(root, this.name))) {
            cb(this, root);

            if (!all) {
                break;
            }
        }
    }
}
