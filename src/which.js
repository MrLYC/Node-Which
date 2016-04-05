#!/usr/bin/env node

var command = require("./command");

function parse_command_line(cmd_args) {
    var program = require("commander");

    var args = {
        all: false,
        filename: null,
    };
    
    program
        .usage("[-a] filename ...")
        .description("locate a command");

    try {
        var package_info = require("../package.json");
        program.version(package_info.version);
    } catch (e) {
        program.version("unknown");
    }    

    program
        .arguments("<filename>")
        .action(function (filename) {
            args.filename = filename;
        })
        
    program.option(
            "-a, --all",
            "print all matching pathnames of each argument"
        )
        
    program.parse(cmd_args);
    args.all = program.all || false;
    
    return args;
}

(function main() {
    var args = parse_command_line(process.argv);
    var cmd = new command(args.filename);
    cmd.find(function (cmd, path) {
        console.log(path);
    }, args.all);
})();