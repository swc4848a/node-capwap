'use strict';

var S = require('string');

const util = require('util');
const readline = require('readline');
const fs = require('fs');
const _ = require('underscore');
const filter = require('./filter');
const field = require('./field');
const keyMap = require('./key');

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
    // console.log(util.inspect(cli, {
    //     depth: null
    // }));
});

cli.get = (module) => {
    let res = {
        code: 0,
        message: 'ok',
        result: []
    };

    let config = cli.config[module];

    if (_.isUndefined(config)) {
        return res;
    }

    let setProcess = (key, set) => {
        if (filter.objectSkip(module, key, set)) {
            return;
        }

        let camelizeObj = {};
        _.each(set, (value, key) => {
            if (!filter.attributeSkip(module, key)) {
                camelizeObj[keyMap.process(module, key)] = field.process(module, key, value);
            }
        });

        let indexObject = {};
        if (keyMap[module]) {
            indexObject[keyMap[module].name] = key; // todo: name ? 
        } else {
            indexObject[name] = key;
        }
        let object = key ? _.extend(indexObject, camelizeObj) : camelizeObj;
        res.result.push(object);
    }

    let edit = cli.config[module].edit;
    if (edit) {
        _.each(edit, (value, key) => {
            setProcess(key, value.set);
        })
    } else {
        let set = cli.config[module].set;
        setProcess(undefined, set);
    }

    return res;
}

module.exports = cli;