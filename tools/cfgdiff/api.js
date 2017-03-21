'use strict';

var S = require('string');

let api = {
    version: (json) => {
        let get = (json) => {
            return {
                code: 0,
                message: "ok",
                result: "v5.4.1, build 1064"
            };
        }

        let check = (json) => {
            return {
                code: 0,
                message: 'ok'
            }
        }

        if (S(json.action).contains("Get")) {
            return get(json);
        } else {
            return {
                code: -1,
                message: "can't support " + json.action
            };
        }
    },
    json: (json) => {
        console.log(json);
        if (S(json.action).contains('version')) {
            return api.version(json);
        } else {
            return {
                code: -1,
                message: "can't support " + json.action
            };
        }
    }
};

module.exports = api;