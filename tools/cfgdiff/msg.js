'use strict';

const msg = {};

msg.dump = () => {
    return 'empty'
}

msg.parse = (data) => {
    console.log('==> ' + data.toString('utf8'));
}

module.exports = msg;