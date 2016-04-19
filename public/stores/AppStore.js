var $ = require('jquery');
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
    }
};

function updateFilterInput(options) {
    _apps.filter.input = assign({}, _apps.filter.input, options);
}

function updateFilterSelect(options) {
    _apps.filter.select = assign({}, _apps.filter.select, options);
}

function updateCollections() {
    _apps.serverRequest = $.get('/Stores', function(result) {
        _apps.collections = result;
        updateFilterSelect({
            options: _.keys(result[0]),
            status: false
        });
        AppStore.emitChange();
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
    serverAbort: function() {
        this.serverRequest.abort();
    },
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
        default:
            console.log('Do not support action type [%s]', action.actionType);
    }
});

module.exports = AppStore;
