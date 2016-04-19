var $ = require('jquery');
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _apps = {
    collections: [],
    selectOptions: []
};

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getAll: function() {
        return _apps.collections;
    },
    getSelectOptions: function() {
        return _apps.selectOptions;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    updateCollections: function() {
        this.serverRequest = $.get('/Stores', function(result) {
            _apps.collections = result;
            _apps.selectOptions = _.keys(result[0]);
            this.emitChange();
        }.bind(this));
    },
    serverAbort: function() {
        this.serverRequest.abort();
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConstants.APP_UPDATE_COLLECTIONS:
            AppStore.updateCollections();
            break;
        case AppConstants.APP_SERVER_ABORT:
            AppStore.serverAbort();
            break;
        default:
            console.log('Do not support action type [%s]', action.actionType);
    }
});

module.exports = AppStore;
