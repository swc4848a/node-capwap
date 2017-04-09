'use strict';

const _ = require('lodash');
var S = require('string');
let cli = require('./cli');

let api = {
    version: (json, method) => {
        let action = {
            get: (json) => {
                return {
                    code: 0,
                    message: "ok",
                    result: "v5.4.1, build 1064"
                };
            },
            check: (json) => {
                return {
                    code: 0,
                    message: 'ok'
                }
            }
        };
        return action[method](json);
    },
    modules: {
        interface: 'system interface',
        addrgrp: 'firewall addrgrp',
        address: 'firewall address',
        dns: 'system dns',
        routing: 'router static',
    },
    advanced: {
        interface: (json, method, params) => {
            let switchType = json.params.switchType;
            let systemInterface = cli.config['system interface']; //todo: missing internal 1->7
            let res = [];
            _.forEach(systemInterface.edit, (value, key) => {
                let type = value.set.type;
                let mode = value.set.mode;
                let ip = value.set.ip;
                if (switchType === 'SWITCH') {
                    if (type != 'vlan' && type != 'physical' && type != 'hard-switch') {
                        return;
                    }
                } else {
                    if (type != 'physical') {
                        return;
                    }
                }
                if (mode && mode != 'static') {
                    return;
                }
                if (ip && ip[0] != '0.0.0.0') {
                    return;
                }
                res.push(key);
            });
            return {
                code: 0,
                message: 'ok',
                result: res
            };
        }
    },
    json: (json) => {
        console.log(json);

        let dash = S(json.action).dasherize().s;
        let csv = S(dash).parseCSV('-');

        const module = csv[0];
        const method = csv[1];

        let params = undefined;
        if (csv.length > 2) {
            params = _.slice(csv, 2);
        }

        if (params && api.advanced[module]) {
            return api.advanced[module](json, method, params);
        } else if (api.modules[module]) {
            let action = {
                get: () => {
                    return cli.get(api.modules[module]);
                },
                put: (json) => {
                    return cli.put(api.modules[module], json.params[module]);
                }
            }
            if (_.isUndefined(action[method])) {
                return {
                    code: -1,
                    message: "can't support method " + method
                };
            }
            return action[method](json);
        } else if (api[module]) {
            return api[module](json, method);
        } else {
            return {
                code: -1,
                message: "can't support " + module
            };
        }
    }
};

module.exports = api;