'use strict'

const _ = require('underscore');

const filter = [];

filter['firewall address'] = {
    key: ['uuid']
};

filter['system interface'] = {
    key: ['vdom', 'vlanforward', 'snmp-index', 'stp'],
    object: (key, value) => {
        return key === 'ssl.root' || value['type'] === 'vap-switch';
    }
};

filter.attributeSkip = (module, key) => {
    return filter[module] && _.contains(filter[module].key, key);
}

filter.objectSkip = (module, key, value) => {
    return filter[module] && filter[module].object(key, value);
}

module.exports = filter;