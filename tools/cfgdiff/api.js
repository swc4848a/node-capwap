'use strict';

const _ = require('underscore');
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
    },
    json: (json) => {
        console.log(json);

        let dash = S(json.action).dasherize().s;
        let csv = S(dash).parseCSV('-');

        const module = csv[0];
        const method = csv[1];

        if (api.modules[module]) {
            let action = {
                get: (json) => {
                    return cli.get(api.modules[module]);
                }
            }
            return action[method](json);
        } else {
            return {
                code: -1,
                message: "can't support " + module
            };
        }
    }
};

module.exports = api;