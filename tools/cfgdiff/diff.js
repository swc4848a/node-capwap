'use strict'

var diff = require('deep-diff').diff;
var observableDiff = require('deep-diff').observableDiff;

let differences = diff(cli, rhs);

// console.log(util.inspect(differences, {
//     depth: null
// }));

let unionDiff = __.unionBy(differences, 'path');

console.log(util.inspect(unionDiff, {
    depth: null
}));

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