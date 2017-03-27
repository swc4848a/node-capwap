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
    address: (json, method) => {
        let action = {
            get: (json) => {
                return cli.get('firewall address');
            }
        };
        return action[method](json);
    },
    addrgrp: (json, method) => {
        let action = {
            get: (json) => {
                return cli.get('firewall addrgrp');
            }
        };
        return action[method](json);
    },
    interface: (json, method) => {
        let action = {
            get: (json) => {
                return cli.get('system interface');
            }
        }
        return action[method](json);
    },
    json: (json) => {
        console.log(json);

        let dash = S(json.action).dasherize().s;
        let csv = S(dash).parseCSV('-');

        const module = csv[0];
        const method = csv[1];

        if (api[module]) {
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