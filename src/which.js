#!/usr/bin/env node

var Command = require("./command");

function parseCommandLine(cmd_args) {
    var program = require("commander");

    var args = {
        all: false,
        filename: null,
    };

    program
        .usage("[-a] filename ...")
        .description("locate a command");

    try {
        var packageInfo = require("../package.json");
        program.version(packageInfo.version);
    } catch (e) {
        program.version("unknown");
    }

    program
        .arguments("<filename>")
        .action(function (filename) {
            args.filename = filename;
        });

    program.option(
            "-a, --all",
            "print all matching pathnames of each argument"
        );

    program.parse(cmd_args);
    args.all = program.all || false;

    if (args.filename == null) {
        program.
        process.exit(2);
    }

    return args;
}

(function main() {
    var args = parseCommandLine(process.argv);
    var exitCode = 1;

    var cmd = new Command(args.filename);
    cmd.find(function (cmd, path) {
        Console.log(path);
        exitCode = 0;
    }, args.all);

    process.exit(exitCode);
})();
