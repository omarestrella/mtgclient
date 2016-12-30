/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
    var app = new EmberApp(defaults, {});

    app.import('bower_components/jquery.cookie/jquery.cookie.js');

    app.import('bower_components/tether/dist/js/tether.js');
    app.import('bower_components/tether-drop/dist/js/drop.js');

    app.import('bower_components/tether/dist/css/tether.css');
    app.import('bower_components/tether-drop/dist/css/drop-theme-basic.css');
    app.import('bower_components/tether-drop/dist/css/drop-theme-arrows.css');

    return app.toTree();
};
