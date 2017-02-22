var diff = require('deep-diff').diff;
var S = require('string');

const util = require('util');
const readline = require('readline');
const fs = require('fs');
const _ = require('underscore');

const rl = readline.createInterface({
    input: fs.createReadStream('webfilter.cli')
});

let cli = {};
let current = null;

rl.on('line', (line) => {
    let lines = S(line).trimLeft().parseCSV(' ', null);
    // console.log(lines);
    switch (lines[0]) {
        case 'config':
            let config_str = S(_.rest(lines)).toCSV(' ', null).s;
            if (!cli.config) cli.config = {};
            cli.config[config_str] = {};
            current = cli.config[config_str];
            break;
        case 'edit':
            let edit_str = S(_.rest(lines)).toCSV(' ', null).s;
            if (!current.edit) current.edit = {};
            current.edit[edit_str] = {};
            current = current.edit[edit_str];
            break;
        case 'next':
            // current = current.parent;
            break;

        default:
            // console.log("not support ", lines[0]);
    }
}).on('close', () => {
    console.log(util.inspect(cli, { showHidden: true, depth: null }));
});

// var lhs = {
//     config: {
//         'system global': {
//             set: {
//                 admintimeout: 480,
//                 alias: "FGT60D4615007833",
//                 'fgd-alert-subscription': ['advisory', 'latest-threat'],
//                 'gui-certificates': 'enable',
//                 'hostname': "FGT60D4615007833",
//                 "timezone": '04',
//             }
//         }
//     }
// };

var rhs = {
    config: {
        'system global': {
            set: {
                admintimeout: 480,
                alias: "FGT60D4615007833",
                'fgd-alert-subscription': ['advisory'],
                'gui-certificates': 'disable',
                'hostname': "FGT60D4615007833",
                "timezone": '04',
            }
        }
    }
};

// var differences = diff(lhs, rhs);

// console.log(util.inspect(differences, { showHidden: true, depth: null }));
