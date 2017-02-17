var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    updateCollections: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_COLLECTIONS,
        });
    },
    serverAbort: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_SERVER_ABORT,
        });
    },
    updateFilterInput: function(label, status) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_FILTER_INPUT,
            label: label,
            status: status
        });
    },
    updateFilterSelect: function(options, status) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_FILTER_SELECT,
            options: options,
            status: status
        });
    },
    toggleFilterSelect: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_TOGGLE_FILTER_SELECT,
        });
    },
    addFilter: function(key, condition) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_ADD_FILTER,
            key: key,
            condition: condition
        });
    },
    updateApnetwork: function(label, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_APNETWORK,
            label: label,
            value: value
        });
    },
    updateAp: function(label, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_AP,
            label: label,
            value: value
        });
    },
    updateMessageType: function(label, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_MESSAGE_TYPE,
            label: label,
            value: value
        });
    },
    updateStamac: function(label, value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_STA_MAC,
            label: label,
            value: value
        });
    },
    updateStartTime: function(value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UDPATE_START_TIME,
            value: value
        });
    },
    updateEndTime: function(value) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UDPATE_END_TIME,
            value: value
        });
    },
    updateGraphData: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_GRAPH_DATA,
        });
    },
    updateSeletctOptions: function(module) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_SELECT_OPTIONS,
            module: module
        });
    },
    updateLogConfig: function(ip, status) {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_SERVER_CONFIG,
            ip: ip,
            status: status
        });
    }
};

module.exports = AppActions;
