'use strict';

var S = require('string');

let api = {
    version: (json) => {
        if (S(json.action).contains("Get")) {

        }
    },
    json: (json) => {
        console.log(json);
        if (S(json.action).contains('version')) {
            this.version(json);
        }
        return {
            json: true
        };
    }
};

module.exports = api;