var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _apps = {
    serverRequest: null,
    collections: [],
    filter: {
        input: {
            label: '',
            status: false
        },
        select: {
            options: [],
            status: false
        },
        list: []
    },
    apnetwork: {},
    ap: {},
    messageType: {},
    graphData: []
};

function updateFilterInput(options) {
    _apps.filter.input = assign({}, _apps.filter.input, options);
}

function updateFilterSelect(options) {
    _apps.filter.select = assign({}, _apps.filter.select, options);
}

function updateCollections() {
    fetch('/Stores').then(function(response) {
        response.json().then(function(json) {
            _apps.collections = json;
            updateFilterSelect({
                options: _.keys(json[0]),
                status: false
            });
            AppStore.emitChange();
        });
    });
}

function toggleFilterSelect() {
    _apps.filter.select = assign({}, _apps.filter.select, {
        status: !_apps.filter.select.status
    });
}

function addFilter(filter) {
    _apps.filter.list.push(filter);
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

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getCollections: function() {
        return _apps.collections;
    },
    getSelect: function() {
        return _apps.filter.select;
    },
    getInput: function() {
        return _apps.filter.input;
    },
    getList: function() {
        return _apps.filter.list;
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
        case AppConstants.APP_UPDATE_FILTER_INPUT:
            updateFilterInput({
                label: action.label,
                status: action.status
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_UPDATE_FILTER_SELECT:
            updateFilterSelect({
                options: action.options,
                status: action.status
            });
            AppStore.emitChange();
            break;
        case AppConstants.APP_TOGGLE_FILTER_SELECT:
            toggleFilterSelect();
            AppStore.emitChange();
            break;
        case AppConstants.APP_ADD_FILTER:
            addFilter({
                key: action.key,
                condition: action.condition
            });
            AppStore.emitChange();
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
        case AppConstants.APP_UPDATE_GRAPH_DATA:
            updateGraphData();
            break;
        default:
            console.log('Do not support action type [%s]', action.actionType);
    }
});

module.exports = AppStore;
