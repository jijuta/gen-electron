

const fs = require("fs");
const shell = require("shelljs");
const camelCase = require("camelcase");
const res = require("./config/db.js");
const sqls = require("./config/mapper.js");
const config = require("./config/config.js");
const cTrl = require("./tpl/egovWeb.js");
const utils = require("./tpl/utils.js");


var readline = require('readline')
    , util = require('util')
    , colors = require('colors') // npm install colors
    , rl = readline.createInterface(process.stdin, process.stdout, completer)

    , help = ['.help        ' + 'display this message.'.grey
        , '.error       ' + 'display an example error'.grey
        , '.q[uit]      ' + 'exit console.'.grey
    ].join('\n')
    ;

// This does not work. Not sure why.
function completer(line) {
    var completions = '.help .error .exit .quit .q'.split(' ')
    completions.map(function (c) {
        if (c.indexOf(line) == 0) {
            console.log('bang!');
            return c;
        }
    });
    return [completions, line];
}

function welcome() {
    util.puts(["= readline-demo "
        , "= Welcome, enter .help if you're lost."
        , "= Try counting from 1 to 5!"
    ].join('\n').grey);
    prompt();
}

function prompt() {
    var arrow = '> '
        , length = arrow.length
        ;

    rl.setPrompt(arrow.grey, length);
    rl.prompt();
}

var state = 1;
function exec(command) {
    var num = parseInt(command, 10);
    console.log("### num ", num);
    if (1 <= num && num <= 5) {
        console.log("### num2 ", num);
        if (num === 1) {
            console.log("### colors ", num.green);
        }
        if (num === 2) {
            console.log(num.green);
            num++
        }
        console.log("### num3 ", num);
        /*if (state === num) {
            state++;
            console.log('WIN'.green);
        } else {
            console.log(('Try entering a different number, like '
                + state + ' for example').red);
        }*/

        if (num === 3) {
            console.log('WOW YOU ROCKS A LOT!'.rainbow);
            //process.exit(0);
            exec(1);
        }

    } else if (command[0] === '.') {

        switch (command.slice(1)) {
            case 'help':
                util.puts(help.yellow);
                break;
            case 'error':
                console.log("Here's what an error might look like");
                JSON.parse('{ a: "bad JSON" }');
                break;
            case 'exit':
            case 'quit':
            case 'q':
                process.exit(0);
                break;
        }
    } else {
        // only print if they typed something
        if (command !== '') {
            console.log(('\'' + command
                + '\' is not a command dude, sorryz').yellow);
        }
    }
    prompt();
}

// 
// Set things up
//
rl.on('line', function (cmd) {
    exec(cmd.trim());
}).on('close', function () {
    // only gets triggered by ^C or ^D
    util.puts('goodbye!'.green);
    process.exit(0);
});

process.on('uncaughtException', function (e) {
    util.puts(e.stack.red);
    rl.prompt();
});

welcome();

// Helpful thing I didn't get around to using:
// Make sure the buffer is flushed before
// we display the prompt.
function flush(callback) {
    if (process.stdout.write('')) {
        callback();
    } else {
        process.stdout.once('drain', function () {
            callback();
        });
    }
};