import Ember from 'ember';

const {
    inject
} = Ember;

export default Ember.Controller.extend({
    session: inject.service(),

    username: null,
    password: null,

    actions: {
        login: function () {
            var self = this;
            var username = this.get('username');
            var password = this.get('password');

            this.get('session').authenticateWithCredentials(username, password)
                .then(function () {
                    self.transitionToRoute('index');
                })
                .catch(function (err) {
                    Ember.Logger.error(err);
                });
        }
    }
});
