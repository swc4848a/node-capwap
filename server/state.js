'use strict';

var Stately = require('stately.js');
var Session = require('./session');
var debug = require('debug')('node-capwap::server::state');

module.exports = State;

function log(event, oldState, newState) {
    let transition = event + ': ' + oldState + ' => ' + newState;
    debug(transition);
}

function State(context) {
    this.session = new Session(context);
    var that = this;

    var states = {
        'START': {
            'INIT_COMPLETE': function() {
                that.session.start();
                return this.IDLE;
            }
        },
        'IDLE': {
            'LOCAL_WTP_CONN': function(server, request) {
                that.session.discoveryRequestProcess(server, request);
                return this.JOIN;
            }
        },
        'JOIN': {
            'JOIN_REQ_RECV': function(server, request) {
                that.session.joinRequestProcess(server, request);
                return this.JOIN;
            },
            'CFG_STATUS_REQ': function(server, request) {
                that.session.configurationStatusRequestProcess(server, request);
                return this.CONFIG;
            },
            'WTP_UNKNOWN': function() {

            },
            'WTP_DISABLED': function() {

            },
            'WTP_HW_UNSUPPORTED': function() {

            }
        },
        'CONFIG': {
            'CHG_STATE_EVENT_REQ_RECV': function(server, request) {
                that.session.changeStateRequestProcess(server, request);
                return this.DATA_CHAN_SETUP;
            }
        },
        'DATA_CHAN_SETUP': {
            'DATA_CHAN_KEEP_ALIVE_RECV': function(server, data, request) {
                that.session.keepAliveProcess(data, request);
                that.session.dataChannelVerifiedProcess(server, request);
                return this.RUN;
            },
        },
        'RUN': {
            'CFG_UPDATE_RESP_RECV': function(server, response) {
                that.session.startConfigurationProcess(server, response);
                return this.RUN;
            },
            'IEEE_80211_WLAN_CFG_RESP_RC_SUCC': function(server, response) {
                that.session.ieee80211ConfigurationResponseProcess(server, response);
                return this.RUN;
            },
            'WTP_EVENT_REQ_RECV': function(server, request) {
                that.session.wtpEventRequestProcess(server, request);
                return this.RUN;
            },
        }
    }

    this.machine = new Stately(states);
    this.machine.bind(log);
}
