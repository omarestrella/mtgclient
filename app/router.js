import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('search');

    this.route('card', function () {
        this.route('detail', { path: '/:id' });
    });

    this.route('deck', { path: '/decks' }, function () {
        this.route('detail', { path: '/:id' }, function () {
            this.route('deck.edit', { path: '/edit', resetNamespace: true });
        });
        this.route('test', { path: '/:id/test', resetNamespace: false });
        this.route('create');
    });

    this.route('login');
    this.route('logout');
    this.route('register');
});

export default Router;
