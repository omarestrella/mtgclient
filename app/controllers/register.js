import Ember from 'ember';

const {
    inject
} = Ember;

export default Ember.Controller.extend({
    ajax: inject.service(),
    session: inject.service(),

    username: null,
    email: null,
    password: null,
    passwordRepeat: null,

    registrationError: false,

    usernameFree: false,

    actions: {
        register: function () {
            var username = this.get('username'),
                email = this.get('email'),
                password = this.get('password'),
                passwordRepeat = this.get('passwordRepeat');

            if (username && email && password && password === passwordRepeat) {
                var self = this;
                var data = {
                    username: username,
                    password: password,
                    email: email
                };

                this.get('ajax').post('/auth/register/', { data })
                    .then(function () {
                        self.set('registrationError', false);

                        self.get('session').authenticateWithCredentials(username, password)
                            .then(function () {
                                self.transitionTo('index');
                            });
                    })
                    .catch(function () {
                        self.set('registrationError', true);
                    });
            }
        }
    },

    formNotComplete: function () {
        var username = this.get('username'),
            email = this.get('email'),
            password = this.get('password'),
            passwordRepeat = this.get('passwordRepeat');

        return !(username && email && password && password === passwordRepeat);
    }.property('username', 'email', 'password', 'passwordRepeat'),

    passwordsNoMatch: function () {
        return this.get('password') !== this.get('passwordRepeat');
    }.property('password', 'passwordRepeat'),

    usernameCheckPassed: function () {
        var username = this.get('username'),
            free = this.get('usernameFree');

        return username && free;
    }.property('username', 'usernameFree'),

    checkUsername: function () {
        var self = this;
        var data = {
            username: this.get('username')
        };

        this.get('ajax').request('/auth/register/', { data })
            .then(function () {
                self.set('usernameFree', false);
            })
            .catch(function () {
                self.set('usernameFree', true);
            });
    }.observes('username')
});
