'use strict';

require(
    [
        'app', 'jquery', 
        'router',
        'views/homepage',
        'bootstrap', 'highcharts'
    ],
    function(
        app, $, 
        Router,
        Homepage
    ) {
        $(document).ready(function() {
            app.start({
                msg: "start up"
            });
        });

        var contextMap = {
            "": Homepage,
        };

        app.navigateTo = function(context, options) {
            console.log(context);
            app.mainRegion.show(new contextMap[context](options));
        };

        app.addInitializer(function(options) {
            app.router = new Router();

            app.addRegions({
                headerRegion: 'header[role="banner"]',
                mainRegion: 'main[role="main"]',
                footerRegion: 'footer[role="contentinfo"]',
            });

            Backbone.history.start();

        });
    }
);