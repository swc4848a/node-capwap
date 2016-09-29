'use strict';

var _ = require('underscore');
var encoder = require('../capwap/encoder');
var serializer = require('packet').createSerializer();
var builder = require('../capwap/builder');
var tool = require('../capwap/tool');
var enumType = require('../capwap/enum');
var state = require('./state');
var message = require('./message');
var config = require('./config');
var debug = require('debug')('node-capwap::server::session');
var Context = require('./context');

module.exports = Session;

function Session() {
    this.context = new Context();
}

Session.prototype.start = function start() {
    this.context.init();
};

Session.prototype.discoveryRequestProcess = function(server, request) {
    // 1. check if ip/port used by other wtp-session
    if (this.context.getWtpHashByIpControlPort(this.context.remote.address, this.context.remote.port)) {
        // any discovery msg from this ip/port can take over previous wtp ws
        // todo: shutdown already running session
        debug("can not get wtp by ip port!");
        return;
    }

    // 2. find wtp hash by sn
    var sn = request.messageElement.wtpBoardData.wtpSerialNumber.value;
    var wtpHash = this.context.getWtpHashBySn(sn);
    if (_.isUndefined(wtpHash)) {
        debug('ap serial number %s not configured.', sn);
        return;
    }

    // 3. udpate wtp hash ip and port
    wtpHash.ip = this.context.remote.address;
    wtpHash.port = this.context.remote.port;

    // 4. check account sta 
    // if request.messageElement.vsp has wbh sta

    // 5. if wtp session already start, shutdown it
    if (wtpHash.session) {
        // shutdown this session
        return;
    }

    message.sendDiscoverResponse(server, request);
};

var isWtpSupportDFS = function isWtpSupportDFS(radio) {

};

Session.prototype.joinRequestProcess = function(server, request) {
    // 1. update wtp capability
    var sn = request.messageElement.wtpBoardData.wtpSerialNumber.value;
    var wtpHash = context.getWtpHashBySn(sn);
    if (1 == request.messageElement.vspWtpCapabilities.value.venderData.version) {
        wtpHash.capability = request.messageElement.vspWtpCapabilities.value.venderData.wtpCapFlags;
    }
    // 2. sn check => wtpHash is get from sn so sn do not need check

    // 4. received JOIN REQ from unmanaged WTP
    if (wtpHash.adminState < enumType.wtpAdminState.WTP_ADMIN_DISCOVERY) {
        debug('received JOIN REQ from unmanaged WTP %s', sn);
        state.WTP_UNKNOWN();
    }
    // 5. received JOIN REQ from admin disabled WTP
    if (wtpHash.adminState < enumType.wtpAdminState.WTP_ADMIN_DISABLE) {
        debug('received JOIN REQ from admin disabled WTP %s', sn);
        state.WTP_DISABLED();
    }
    // 6. we check if WTP support DFS here
    for (var i = 0; i < 2; ++i) {
        var radio = wtpHash.radio[i];
        if (enumType.wtpRadioMode.RMODE_NODEV === radio.mode) {
            if (!isWtpSupportDFS(radio)) {
                if (enumType.wtpRadioType.CW_11_RADIO_TYPE_11a === radio.type ||
                    enumType.wtpRadioType.CW_11_RADIO_TYPE_11n_5G === radio.type ||
                    enumType.wtpRadioType.CW_11_RADIO_TYPE_11ac === radio.type) {
                    /* 
                     * we need to check both radio_type and chan_num here. 
                     * because if WTP has 2G HZ radio and 2G HZ md_cap 
                     * may be empty,  we can't deny it, 
                     * because for 2G HZ, empty md_cap means all channels, 
                     * its md_cap_no_dfs[] is the same as md_cap[]
                     */
                    // 7. we need to check both radio_type and chan_num here.
                    if (radio.mdCap[0].channelNumber && 0 === radio.mdCapNoDfs[0].channelNumeber) {
                        /* 
                         * WTP is on 5G HZ freq and it doesn't support DFS, 
                         * all channels selected are DFS channels, then deny 
                         *  
                         * we use code CW_RC_JOIN_FAILURE_WTP_HW_UNSUPPORTED 
                         * it means : Join Failure (WTP Hardware not supported) 
                         */
                        // CW_RC_JOIN_FAILURE_WTP_HW_UNSUPPORTED process
                        // send response with result code CW_RC_JOIN_FAILURE_WTP_HW_UNSUPPORTED

                        break;
                    }
                }
            }
        }
    }
    // 8. received JOIN REQ from WTP with unsupported radio
    for (var i = 0; i < 2; ++i) {
        var radio = wtpHash.radio[i];
        if (enumType.wtpRadioMode.RMODE_WTP === radio.mode) {
            var wtpRadioInfoArray = request.messageElement.ieee80211WtpRadioInformation;
            var wtpRadioInfo = _.findWhere(wtpRadioInfoArray, {
                radioId: i + 1
            });
            radio.radioTypeWtp = wtpRadioInfo.radioType;
            if (enumType.apScanType.CW_AP_SCAN_FG === radio.apScan ||
                enumType.apScanType.CW_AP_SCAN_FG2 === radio.apScan) {
                continue;
            }
            if (0 === radio.type & enumType.wtpRadioType.CW_11_RADIO_TYPE_MASK & radio.radioTypeWtp) {
                debug('received JOIN REQ from WTP with unsupported radio %d type %x AC %x', i, radio.radioTypeWtp, radio.radioType);
                state.WTP_HW_UNSUPPORTED();
                // send response with resul code CW_RC_JOIN_FAILURE_WTP_HW_UNSUPPORTED
            }
        }
    }

    // update local ipv4 address
    if (request.messageElement.capwapLocalIpv4Address) {
        wtpHash.wtpLocalIp = request.messageElement.capwapLocalIpv4Address.value;
    }
    // 9. if the radio type check is done.
    wtpHash.tunnelTypeSupport = request.messageElement.wtpFrameTunnelMode.value.wtpFrameTunnelMode;
    wtpHash.macTypeSupport = request.messageElement.wtpMacType.value.wtpMacType;

    // 10. update wtp information
    wtpHash.boardId = request.messageElement.wtpBoardData.wtpBoardId.value;

    wtpHash.boardRevision = request.messageElement.wtpBoardData.wtpBoardRevision.value;
    wtpHash.baseMacAddress = request.messageElement.wtpBoardData.wtpBaseMacAddress.value;

    // todo: refacor to uniform architecture
    wtpHash.wtpHardwareVersion = request.messageElement.wtpDescriptor.value.wtpDescriptorHardwareVersionValue;
    wtpHash.wtpActiveSoftwareVersion = request.messageElement.wtpDescriptor.value.wtpDescriptorActiveSoftwareVersionValue;
    wtpHash.wtpBootVersion = request.messageElement.wtpDescriptor.value.wtpDescriptorBootVersionValue;
    wtpHash.wtpOtherSoftwareVersion = request.messageElement.wtpDescriptor.value.wtpDescriptorOtherSoftwareVersionValue;

    if (request.messageElement.vspWbhStation) {
        // udpate 
    } else {
        // update other
    }

    wtpHash.sessionId = request.messageElement.sessionId.value.sessionId;

    debug(wtpHash);
    // todo: notify worker thread?

    message.sendJoinResponse(server, request);
};

Session.prototype.configurationStatusRequestProcess = function(server, request) {
    var tlv = [
        builder.buildCapwapTimers(),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var configurationStatusResponse = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.CONFIGURATION_STATUS_RESPONSE,
            sequneceNumber: request.controlHeader.sequneceNumber,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(configurationStatusResponse, 0, configurationStatusResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug('Send Configuration Status Response');
};

Session.prototype.changeStateRequestProcess = function(server, request) {
    var tlv = [
        builder.buildResultCode(0),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var changeStateResponse = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.CHANGE_STATE_RESPONSE,
            sequneceNumber: request.controlHeader.sequneceNumber,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(changeStateResponse, 0, changeStateResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug('Send Change State Response');
};

Session.prototype.keepAliveProcess = function(data, request) {
    var tlv = [
        builder.buildSessionId(),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var keepAlive = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(0x00008),
        keepAlive: {
            messageElementLength: elementLength,
            tlv: tlv
        }
    });
    data.send(keepAlive, 0, keepAlive.length, enumType.socket.CLIENT_DATA_PORT, enumType.socket.CLIENT_IP);
    debug('Send Keep Alive');
};

Session.prototype.dataChannelVerifiedProcess = function(server, request) {
    var tlv = [
        builder.buildWtpName(),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var configurationUpdateRequest = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.CONFIGURATION_UPDATE_REQUEST,
            sequneceNumber: context.sequneceNumber++,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(configurationUpdateRequest, 0, configurationUpdateRequest.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug("Send Configuration Update Request");
};

var addWlan = function(server, request) {
    var tlv = [
        builder.buildIeee80211AddWlan(),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var ieee80211WlanConfigurationRequest = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.IEEE_80211_WLAN_CONFIGURATION_REQUEST,
            sequneceNumber: context.sequneceNumber++,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(ieee80211WlanConfigurationRequest, 0, ieee80211WlanConfigurationRequest.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug("Send 802.11 WLAN Configuration Request");
};

Session.prototype.startConfigurationProcess = function(server, request) {
    // todo: if condition => start JSON data push
    // todo: addWlan need to move correct position
    addWlan(server, request);
};

Session.prototype.ieee80211ConfigurationResponseProcess = function(server, response) {
    // todo: assinged wtp bssid
    if (response.messageElement.ieee80211AssignedWtpBssid) {

    }
    // todo: wlan add
    // todo: wlan delete
    // todo: wlan update
};

Session.prototype.wtpEventRequestProcess = function(server, request) {
    var tlv = [
        builder.buildResultCode(0),
    ]
    var elementLength = tool.calMessageElementLength(tlv);
    var wtpEventResponse = encoder.encode({
        preamble: builder.getPreamble(),
        header: builder.getHeader(),
        controlHeader: {
            messageType: enumType.messageType.WTP_EVENT_RESPONSE,
            sequneceNumber: request.controlHeader.sequneceNumber,
            messageElementLength: elementLength,
            flags: 0
        },
        tlv: tlv
    });
    server.send(wtpEventResponse, 0, wtpEventResponse.length, enumType.socket.CLIENT_PORT, enumType.socket.CLIENT_IP);
    debug('Send WTP Event Response');
};
