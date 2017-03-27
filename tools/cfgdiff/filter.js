'use strict'

const _ = require('underscore');

const filter = {
    key: [],
    value: []
};

filter.key['firewall address'] = ['uuid'];
filter.key['system interface'] = ['vdom', 'vlanforward', 'snmp-index'];

filter.value['system interface'] = ['tunnel']; //todo: add key

filter.contains = (module, key, value) => {
    if (filter.key[module] && (_.contains(filter.key[module], key) || _.contains(filter.value[module], value))) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = filter;