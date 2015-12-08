'use strict';

require(
    [
        'app', 'jquery', 'bootstrap', 'highcharts'
    ],
    function(
        app, $
    ) {
        $(document).ready(function() {
            app.start({
                msg: "start up"
            });
        });

        var contextMap = {
            // "": Homepage,
        };

        app.navigateTo = function(context, options) {
            app.mainRegion.show(new contextMap[context](options));
        };

        app.addInitializer(function(options) {

            app.addRegions({
                headerRegion: 'header[role="banner"]',
                mainRegion: 'main[role="main"]',
                footerRegion: 'footer[role="contentinfo"]',
            });

        });
    }
);