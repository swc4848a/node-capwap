'use strict';

const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var decoder = require('../capwap/decoder');
var enumType = require('../capwap/enum');
var Context = require('./context');
var debug = require('debug')('node-capwap::server::server');

let context = {};

server.on('listening', function() {
    var address = server.address();
    debug('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {
    let key = remote.address + ':' + remote.port;
    decoder.parse(message, function(request) {
        var type = request.controlHeader.messageType;
        if (enumType.messageType.DISCOVERY_REQUEST == type) {
            debug('Receive Discover Request');
            context[key] = new Context(remote.address, remote.port);
            context[key].state.machine.LOCAL_WTP_CONN(server, request);
        } else if (enumType.messageType.JOIN_REQUEST === type) {
            debug('Receive Join Request');
            context[key].state.machine.JOIN_REQ_RECV(server, request);
        } else if (enumType.messageType.CONFIGURATION_STATUS_REQUEST === type) {
            debug('Receive Configuration Status Request');
            context[key].state.machine.CFG_STATUS_REQ(server, request);
        } else if (enumType.messageType.CHANGE_STATE_REQUEST === type) {
            debug('Receive Change State Request');
            context[key].state.machine.CHG_STATE_EVENT_REQ_RECV(server, request);
        } else if (enumType.messageType.CONFIGURATION_UPDATE_RESPONSE === type) {
            debug('Receive Configuration Update Response');
            context[key].state.machine.CFG_UPDATE_RESP_RECV(server, request);
        } else if (enumType.messageType.IEEE_80211_WLAN_CONFIGURATION_RESPONSE === type) {
            debug('Receive IEEE 802.11 Configuration Response');
            context[key].state.machine.IEEE_80211_WLAN_CFG_RESP_RC_SUCC(server, request);
        } else if (enumType.messageType.WTP_EVENT_REQUEST === type) {
            debug('Receive WTP Event Request');
            context[key].state.machine.WTP_EVENT_REQ_RECV(server, request);
        } else {
            console.trace('unknow message [%d]', type);
        }
    });
});

server.on("error", function(err) {
    console.trace("Server Error:\n" + err.stack);
    server.close();
});

server.on("close", function(err) {
    debug("Server close");
});

module.exports = server;