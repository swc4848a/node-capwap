'use strict';

var Stately = require('stately.js');
var Session = require('./session');
var debug = require('debug')('node-capwap::server::state');

module.exports = State;

function log(event, oldState, newState) {
    let transition = event + ': ' + oldState + ' => ' + newState;
    debug(transition);
}

function State() {
    this.session = new Session();
    this.setup();
    this.machine = new Stately(this.statesObject);
    this.bind(log);
}

State.prototype.setup = () => {
    this.statesObject = {
        'START': {
            'INIT_COMPLETE': function() {
                this.session.start();
                return this.IDLE;
            }
        },
        'IDLE': {
            'LOCAL_WTP_CONN': function(server, request) {
                this.session.discoveryRequestProcess(server, request);
                return this.JOIN;
            }
        },
        'JOIN': {
            'JOIN_REQ_RECV': function(server, request) {
                this.session.joinRequestProcess(server, request);
                return this.JOIN;
            },
            'CFG_STATUS_REQ': function(server, request) {
                this.session.configurationStatusRequestProcess(server, request);
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
                this.session.changeStateRequestProcess(server, request);
                return this.DATA_CHAN_SETUP;
            }
        },
        'DATA_CHAN_SETUP': {
            'DATA_CHAN_KEEP_ALIVE_RECV': function(server, data, request) {
                this.session.keepAliveProcess(data, request);
                this.session.dataChannelVerifiedProcess(server, request);
                return this.RUN;
            },
        },
        'RUN': {
            'CFG_UPDATE_RESP_RECV': function(server, response) {
                this.session.startConfigurationProcess(server, response);
                return this.RUN;
            },
            'IEEE_80211_WLAN_CFG_RESP_RC_SUCC': function(server, response) {
                this.session.ieee80211ConfigurationResponseProcess(server, response);
                return this.RUN;
            },
            'WTP_EVENT_REQ_RECV': function(server, request) {
                this.session.wtpEventRequestProcess(server, request);
                return this.RUN;
            },
        }
    };
}
