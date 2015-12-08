'use strict';

require.config({

    baseUrl: '/',

    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'underscore': 'bower_components/underscore/underscore',
        'backbone': 'bower_components/backbone/backbone',
        'marionette': 'bower_components/marionette/lib/backbone.marionette',
        'handlebars': 'bower_components/handlebars/handlebars',
        'highcharts': 'bower_components/highcharts/lib/highcharts',
        'text': 'bower_components/text/text'
    },

    // non-AMD lib
    shim: {
        'underscore': {
            exports: '_'
        },
        'bootstrap': {
            deps: ['jquery'],
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'handlebars': {
            exports: 'Handlebars'
        },
    },
});

require(['main']); // Initialize the application with the main application file.