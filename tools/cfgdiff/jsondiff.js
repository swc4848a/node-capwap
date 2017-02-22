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
let current = [cli];
let top = 0;

let rhs = {
    config: {
        'webfilter profile': {
            edit: {
                default: {
                    set: {
                        comment: 'M Default Web Filtering.',
                        options: ['activexfilter',
                            'cookiefilter',
                            'javafilter',
                            'block-invalid-url'
                        ]
                    },
                    config: {
                        override: { set: { 'ovrd-dur': '1d2h3m', profile: 'monitor-all' } },
                        web: { set: { 'bword-table': '1' } },
                        'ftgd-wf': {
                            set: {
                                options: ['error-allow',
                                    'http-err-detail',
                                    'rate-server-ip',
                                    'redir-block'
                                ],
                                ovrd: ['75', 'g05']
                            },
                            config: {
                                filters: {
                                    edit: {
                                        '1': { set: { category: '2' } },
                                        '2': { set: { category: '7' } }
                                    }
                                },
                                quota: {
                                    edit: {
                                        '1': { set: { category: 'g02' } },
                                        '2': { set: { duration: '17s' } }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
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

    console.log(util.inspect(differences, { depth: null }));

    ((diff) => {
        diff.forEach((elem) => {
            let cli_start = '';
            let cli_end = '';
            elem.path.forEach((item) => {
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
            let cli_cmd = cli_start + ' ' + elem.rhs + cli_end;
            console.log(cli_cmd);
        })
    })(differences);
});