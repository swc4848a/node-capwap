var builder = require('../capwap/builder');
var encoder = require('../capwap/encoder');
var enumType = require('../capwap/enum');
var tool = require('../capwap/tool');
var context = require('./context');
var debug = require('debug')('node-capwap::server::message');

var message = exports = module.exports = {};

message.sendDiscoverResponse = function sendDiscoverResponse(server, request) {
    var tlv = [
        builder.buildAcDescriptor(),
        builder.buildAcName(),
        builder.buildVspWtpAllow(request.messageElement.wtpBoardData.wtpSerialNumber.value),
    ];
    var elementLength = tool.calMessageElementLength(tlv);
    var discoverResponse = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: 2,
            sequneceNumber: request.controlHeader.sequneceNumber,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    
    debug("remote => ", context.remote);

    server.send(discoverResponse, 0, discoverResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP /* error callback */ );
    debug('Send Discover Response');
};

message.sendJoinResponse = function sendJoinResponse(server, request) {
    var tlv = [
        builder.buildResultCode(0), // Success
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var joinResponse = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.JOIN_RESPONSE,
            sequneceNumber: request.controlHeader.sequneceNumber,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(joinResponse, 0, joinResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug('Send Join Response');
};