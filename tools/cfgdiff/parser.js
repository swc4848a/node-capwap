'use strict';

var S = require('string');

const util = require('util');
const readline = require('readline');
const fs = require('fs');
const _ = require('underscore');
const __ = require('lodash');

const rl = readline.createInterface({
    input: fs.createReadStream('local')
});

let cli = {};
let current = [cli];
let top = 0;

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
            console.log("not support ", lines[0]);
    }
}).on('close', () => {
    console.log(util.inspect(cli, {
        depth: null
    }));
});