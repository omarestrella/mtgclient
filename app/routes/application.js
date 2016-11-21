import Ember from 'ember';

const {
    inject
} = Ember;

export default Ember.Route.extend({
    session: inject.service(),

    actions: {
        transition: function () {
            if(!this.get('session').get('isAuthenticated')) {
                this.transitionTo('login');
            }
        },

        logout: function () {
            var route = this;
            var session = this.get('session');
            session.logout().then(function () {
                route.transitionTo('login');
            });
        }
    },

    beforeModel: function (transition) {
        var self = this;

        return this.get('session').authenticateWithToken()
            .catch(function (err) {
                Ember.Logger.error(err);
                if(!self.get('session.isAuthenticated') && transition.targetName !== 'register') {
                    self.transitionTo('login');
                }
            });

    }
});
