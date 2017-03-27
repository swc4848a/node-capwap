'use strict'

const _ = require('lodash');

const field = {};

field['firewall address'] = {
    visibility: 'bin_option',
    type: ['upcase', 'underline'],
    subnet: 'string',
};

field['system interface'] = {
    type: ['upcase', 'underline'],
    role: 'upcase',
    mode: 'upcase',
    ip: (value) => {
        return value[0] + '/' + value[1];
    }
};

let process = (value, option) => {
    switch (option) {
        case 'bin_option':
            return ('enable' == value) ? 1 : 0;
            break;
        case 'upcase':
            return _.toUpper(value);
            break;
        case 'string':
            return _.toString(value);
            break;
        case 'underline':
            return _.replace(value, '-', '_');
            break;
        default:
            console.error("can't support value type " + option);
            return value;
    }
}

field.process = (module, key, value) => {
    let m = field[module];
    if (_.isUndefined(m)) return value;

    let option = m[key];
    if (_.isUndefined(option)) return value;

    if (_.isArray(option)) {
        let pvalue = value;
        _.forEach(option, (item) => {
            pvalue = process(pvalue, item);
        })
        return pvalue;
    } else if (_.isFunction(option)) {
        return option(value);
    } else {
        return process(value, option);
    }
}

module.exports = field;