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
    updateSelectOptions: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_OPTIONS,
        });
    }
};

module.exports = AppActions;
