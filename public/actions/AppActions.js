var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    updateCollections: function() {
        AppDispatcher.dispatch({
            actionType: AppConstants.APP_UPDATE_COLLECTIONS,
        });
    },
};

module.exports = AppActions;
