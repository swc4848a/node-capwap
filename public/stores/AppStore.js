var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var CHANGE_EVENT = 'change';

var _apps = {

};

function updateCollecions() {
    // do sql query
    _apps = assign({}, _apps, udpates);
};

var AppStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    getAll: function() {
        return _apps;
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case AppConstants.APP_UPDATE_COLLECTIONS:
            updateCollecions();
            AppStore.emitChange();
            break;
        default:
            console.log('Do not support action type [%s]', action.actionType);
    }
});

module.exports = AppStore;
