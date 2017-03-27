'use strict';

const _ = require('lodash');
var S = require('string');

let keyMap = {};

keyMap['system interface'] = {
    ip: () => {
        return 'ipMask';
    },
    allowaccess: () => {
        return 'allowAccess';
    }
}

keyMap.process = (module, key) => {
    if (keyMap[module] && _.isFunction(keyMap[module][key])) {
        return keyMap[module][key]();
    } else {
        return S(key).camelize().s;
    }
}

module.exports = keyMap;