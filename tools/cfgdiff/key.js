'use strict';

const _ = require('lodash');
var S = require('string');

let keyMap = {};

keyMap['system interface'] = {
    ip: 'ipMask',
    allowaccess: 'allowAccess',
}

keyMap['router static'] = {
    name: 'seqNum'
}

keyMap.process = (module, key) => {
    if (keyMap[module] && keyMap[module][key]) {
        return keyMap[module][key];
    } else {
        return S(key).camelize().s;
    }
}

module.exports = keyMap;