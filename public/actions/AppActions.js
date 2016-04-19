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
    }
};

module.exports = AppActions;
