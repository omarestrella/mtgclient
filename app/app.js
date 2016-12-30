import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

Ember.RSVP.configure('onerror', function(error) {
    if (error instanceof Error) {
        Ember.Logger.error(error.stack);
    }
});

var sockets = {};

var connect = function (namespace) {
    return io.connect('http://localhost:9000/' + namespace);
};

var socket = function (namespace) {
    var socket = sockets[namespace];
    if(!socket) {
        socket = connect(namespace);
        sockets[namespace] = socket;
    }

    return socket;
};

Function.prototype.onEvent = function (namespace, eventName) {
    this.__socket_events = [namespace, eventName];
    return this;
};

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver,

    init() {
        this._super(...arguments);
        window.MTG = this;
    },

    store: Ember.computed(function () {
        return this.serviceFor('store');
    }),

    componentFor(id) {
        return this.__container__.lookup('-view-registry:main')[id];
    },

    serviceFor(name) {
        return this.__container__.lookup(`service:${name}`);
    }
});

loadInitializers(App, config.modulePrefix);

export default App;
