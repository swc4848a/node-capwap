var diff = require('deep-diff').diff;
var observableDiff = require('deep-diff').observableDiff;

let rhs = require('./json.js')

var S = require('string');

const util = require('util');
const readline = require('readline');
const fs = require('fs');
const _ = require('underscore');
const __ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('webfilter.cli')
});

let cli = {};
let current = [cli];
let top = 0;


let path = (path) => {
    let cli_start = '';
    let cli_end = '';
    path.forEach((item) => {
        cli_start += ' ';
        cli_end += ' ';
        switch (item) {
            case 'config':
                cli_start += '\r\nconfig';
                cli_end += '\r\nend';
                break;
            case 'edit':
                cli_start += '\r\nedit';
                cli_end += '\r\nnext';
                break;
            case 'set':
                cli_start += '\r\nset';
                break;
            default:
                cli_start += item;
                break;
        }
    });
    return {
        start: cli_start,
        end: cli_end
    };
}

let E = (elem) => {
    let cli_string = path(elem.path);
    let set_value = S(elem.rhs).contains(' ') ? ('"' + elem.rhs + '"') : elem.rhs;
    let cli_cmd = cli_string.start + ' ' + set_value + cli_string.end;
    console.log(cli_cmd);
};

let A = (elem) => {
    let cli_string = path(elem.path);
    let set_array = ((path, obj) => {
        let ref = rhs;
        _.each(path, (item) => {
            ref = ref[item];
        })
        return ref;
    })(elem.path, rhs)
    let set_value = S(set_array).toCSV(' ', null);
    let cli_cmd = cli_string.start + ' ' + set_value + cli_string.end;
    console.log(cli_cmd);
};

rl.on('line', (line) => {
    let lines = S(line).trimLeft().parseCSV(' ', '"');
    // console.log(lines);
    switch (lines[0]) {
        case 'config':
            let config_str = S(_.rest(lines)).toCSV(' ', null).s;
            if (!current[top].config) current[top].config = {};
            let config = current[top].config[config_str] = {};
            current[++top] = config;
            break;
        case 'end':
            top--;
            break;
        case 'edit':
            let edit_str = S(_.rest(lines)).toCSV(' ', null).s;
            if (!current[top].edit) current[top].edit = {};
            let edit = current[top].edit[edit_str] = {};
            current[++top] = edit;
            break;
        case 'next':
            top--;
            break;
        case 'set':
            let set_key = lines[1];
            let set_value = lines.length == 3 ? lines[2] : lines.slice(2);
            if (!current[top].set) current[top].set = {};
            current[top].set[set_key] = set_value;
            break;
        default:
            // console.log("not support ", lines[0]);
    }
}).on('close', () => {
    // console.log(util.inspect(cli, { depth: null }));

    let differences = diff(cli, rhs);

    // console.log(util.inspect(differences, {
    //     depth: null
    // }));

    let unionDiff = __.unionBy(differences, 'path');

    console.log(util.inspect(unionDiff, {
        depth: null
    }));

    ((diff) => {
        diff.forEach((elem) => {
            switch (elem.kind) {
                case 'E':
                    E(elem);
                    break;
                case 'A':
                    A(elem);
                    break;
                default:
                    console.log('unkown kind: ', elem.kind);
                    break;
            }
        })
    })(unionDiff);

});