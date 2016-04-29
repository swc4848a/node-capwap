var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _apps = {
    serverRequest: null,
    collections: [],
    apnetwork: {
        options: []
    },
    ap: {
        options: []
    },
    messageType: {
        options: []
    },
    startTime: {},
    endTime: {},
    graphData: []
};

function updateCollections() {
    if (_apps.startTime.value && _apps.endTime.value) {
        var url = '/Stores/Raws?start=' + _apps.startTime.value + '&end=' + _apps.endTime.value;
        fetch(url).then(function(response) {
            response.json().then(function(json) {
                _apps.collections = json;
                AppStore.emitChange();
            });
        });
    }
}

function updateApnetwork(apnetwork) {
    _apps.apnetwork = assign({}, _apps.apnetwork, apnetwork);
}

function updateAp(ap) {
    _apps.ap = assign({}, _apps.ap, ap);
}

function updateMessageType(messageType) {
    _apps.messageType = assign({}, _apps.messageType, messageType);
}

function updateStartTime(startTime) {
    _apps.startTime = assign({}, _apps.startTime, startTime);
}

function updateEndTime(endTime) {
    _apps.endTime = assign({}, _apps.endTime, endTime);
}

function updateGraphData() {
    var url = '/Graph?' +
        'messageType=' + _apps.messageType.value +
        '&apnetwork=' + _apps.apnetwork.value +
        '&ap=' + _apps.ap.label;

    fetch(url).then(function(response) {
        response.json().then(function(json) {
            _apps.graphData = json;
            AppStore.emitChange();
        });
    });
}

function updateSelectOptions(config) {
    let module = config.module;
    let query = ('ap' === module) ? ('?apnetwork=' + _apps.apnetwork.value) : '';
    fetch('/Options/' + module + query).then(function(response) {
        response.json().then(function(json) {
            if ('apnetwork' === module) {
                _apps.apnetwork = assign({}, _apps.apnetwork, {
                    options: json
                });
            } else if ('ap' === module) {
                _apps.ap = assign({}, _apps.ap, {
                    options: json
                });
            } else if ('messageType' === module) {
                _apps.messageType = assign({}, _apps.messageType, {
                    options: json
                });
            }
            AppStore.emitChange();
        });
    });
}

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCollections: function() {
        return _apps.collections;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    serverAbort: function() {},
    getApnetwork: function() {
        return _apps.apnetwork;
    },
    getAp: function() {
        return _apps.ap;
    },
    getMessageType: function() {
        return _apps.messageType;
    },
    getStartTime: function() {
        return _apps.startTime;
    },
    getEndTime: function() {
        return _apps.endTime;
    },
    getGraphData: function() {
        return _apps.graphData;
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConstants.APP_UPDATE_COLLECTIONS:
            updateCollections();
            break;
        case AppConstants.APP_SERVER_ABORT:
            AppStore.serverAbort();
            break;
        case AppConstants.APP_UPDATE_APNETWORK:
            updateApnetwork({
                label: action.label,
                value: action.value
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UPDATE_AP:
            updateAp({
                label: action.label,
                value: action.value
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UPDATE_MESSAGE_TYPE:
            updateMessageType({
                label: action.label,
                value: action.value
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UDPATE_START_TIME:
            updateStartTime({
                value: action.value
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UDPATE_END_TIME:
            updateEndTime({
                value: action.value
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UPDATE_GRAPH_DATA:
            updateGraphData();
            break;
        case AppConstants.APP_UPDATE_SELECT_OPTIONS:
            updateSelectOptions({
                module: action.module
            });
            break;
        default:
            console.log('Do not support action type [%s]', action.actionType);
    }
});

module.exports = AppStore;
